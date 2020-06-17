const connection = require('../database/connection');

module.exports = {
    async list_objective(request, response) {
        const objectives = await connection('objectives').select('*');
    
        return response.json(objectives);
    },

    async create_objective(request, response) {
        const{ objective_name, category } = request.body;

        const user_id = request.headers.authorization;

        const [id] = await connection('objectives').insert({
            objective_name,
            category,
            user_id,
        })

        return response.json({ id });
        
    },

    async delete_objective(request, response) {
        const { id } = request. params;
        const user_id = request.headers.authorization;

        const objective = await connection('objectives')
            .where('id', id)
            .select('user_id')
            .first();

        if (objective.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('objectives').where('id', id).delete();

        return response.status(204).send();
    },

    async show_goals_of_objective(request, response) {
        const objective_id = request.headers.authorization;

        const goals = await connection('goals')
        .where('objective_id', objective_id)
        .select('*');

        return response.json(goals);
    },

    async update_objective(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;
        const { objective_name, category } = request.body;

        const objective = await connection('objectives')
        .where({'id': id,
                'user_id': user_id})
        .update({'objective_name': objective_name, 
                 'category': category});

        return response.json({ sucess: 'Operation is updated.' });
    }
};