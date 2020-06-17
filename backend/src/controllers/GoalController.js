const connection = require('../database/connection');

module.exports = {
    async list_goal(request, response) {
        const goals = await connection('goals')
        .join('objectives', 'objectives.id', '=', 'goals.id')
        .select([
            'goals.*',
            'objectives.objective_name', 
            'objectives.category'
        ]);
    
        return response.json(goals);
    },

    async create_goal(request, response) {
        const{ goal_name, goal_activity } = request.body;

        const objective_id = request.headers.authorization;

        const [id] = await connection('goals').insert({
            goal_name,
            goal_activity,
            objective_id
        })

        return response.json({ id });
        
    },

    async delete_goal(request, response) {
        const { id } = request. params;
        const objective_id = request.headers.authorization;

        const goal = await connection('goals')
            .where('id', id)
            .select('objective_id')
            .first();

        if (goal.objective_id != objective_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('goals').where('id', id).delete();

        return response.status(204).send();
    },

    async update_goal(request, response) {
        const { id } = request.params;
        const objective_id = request.headers.authorization;
        const { goal_name, goal_activity } = request.body;

        const goal = await connection('goals')
        .where({'id': id,
                'objective_id': objective_id})
        .update({'goal_name': goal_name, 
                 'goal_activity': goal_activity});

        return response.json({ sucess: 'Operation is updated.' });
    }
};