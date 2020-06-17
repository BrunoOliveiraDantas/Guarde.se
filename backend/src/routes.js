const express = require('express');
const UserController = require('./controllers/UserController');
const ObjectiveController = require('./controllers/ObjectiveController');
const GoalController = require('./controllers/GoalController');
const SessionController = require('./controllers/SessionController');
const connection = require('./database/connection');

const routes = express.Router();

routes.post('/login', SessionController.login);

routes.get('/users', UserController.list_users);
routes.post('/users', UserController.create_user);
routes.get('/quantity_objective', UserController.show_quantity_of_objective);
routes.get('/list_objective_category/:category', UserController.list_objective_category);

routes.get('/objectives', ObjectiveController.list_objective);
routes.post('/objectives', ObjectiveController.create_objective);
routes.delete('/objectives/:id', ObjectiveController.delete_objective);
routes.get('/get_goals', ObjectiveController.show_goals_of_objective);
routes.post('/update/:id', ObjectiveController.update_objective);

routes.get('/goals', GoalController.list_goal);
routes.post('/goals', GoalController.create_goal);
routes.delete('/goals/:id', GoalController.delete_goal);
routes.post('/update_goal/:id', GoalController.update_goal);

module.exports = routes;