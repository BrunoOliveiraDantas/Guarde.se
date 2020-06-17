const connection = require('../database/connection');

module.exports = {
    async list_users(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },

    async create_user(request, response) {
        const {name, email, password } = request.body;

        const [id] = await connection('users').insert({
            name,
            email,
            password,
        })
    
        return response.json({ id });
    },

    async show_quantity_of_objective(request, response) {
        const user_id = request.headers.authorization;

        const objectives = await connection('objectives')
        .where('user_id', user_id)
        .select('*');

        return response.json(objectives.length);
    },

    async list_objective_category(request, response) {
        const user_id = request.headers.authorization;
        const { category } = request.params;

        const objectives = await connection('objectives')
        .where({'user_id': user_id,
                'category': category})
        .select('*');

        return response.json(objectives);
    },


};