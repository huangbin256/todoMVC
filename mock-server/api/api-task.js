var utils = require('../utils.js');
var daos = require('../dao/daos.js');

var routes = []; 

// This export One Extension that can have multiple routes 
// that will be loaded by App in app.js
module.exports = routes;

routes.push({
	method: 'POST',
	path:'/task-create', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var props = Object.assign({}, JSON.parse(payload.props));
			var id = yield daos.task.create(props);
			reply(Object.assign({}, {id: id}, props));
		}
	}
});

routes.push({
	method: 'POST',
	path:'/task-update', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var props = Object.assign({}, JSON.parse(payload.props));
			yield daos.task.update(props);
			reply(props);
		}
	}
});

routes.push({
	method: 'POST',
	path:'/task-delete', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var id = payload.id;
			yield daos.task.delete(id);
			reply(id);
		}
	}
});

routes.push({
	method: 'GET',
	path:'/task-get', 
	handler: {
		async: function* (request, reply) {
			var payload = request.url.query;
			var id = payload.id;
			var task =  yield daos.task.get(id);
			reply(task);
		}
	}
});

routes.push({
	method: 'GET',
	path:'/task-list', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var tasks =  yield daos.task.list();
			reply(tasks);
		}
	}
});