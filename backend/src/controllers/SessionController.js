const connection = require('../database/connection');

module.exports = {
    async login(request, response) {
        const { email, password } = request.body;

        const user = await connection('users')
            .where({'email': email,
                    'password': password})
            .select('name')
            .first();
        
        if (!user) {
            return response.status(400).json({ error: 'No USER found with this EMAIL OR PASSWORD'});
        }

        return response.json(user);
    }
}