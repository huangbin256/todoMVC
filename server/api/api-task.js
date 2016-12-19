var utils = require('../utils.js');
var fs = require("fs");

var routes = []; 

// This export One Extension that can have multiple routes 
// that will be loaded by App in app.js
module.exports = routes;

var _tasks = [];
var _taskSeq = 1;
fs.readFile("./server/data/data-tasks.json", "utf-8", function(err, taskData){
	var tasks = JSON.parse(taskData);
	_tasks = Object.assign([], tasks);
	_taskSeq = tasks.length + 1;
});

routes.push({
	method: 'POST',
	path:'/task-create', 
	handler: {
		async: function* (request, reply) {
			var payload = request.payload;
			var props = Object.assign({}, JSON.parse(payload.props));
			props.id = _taskSeq++;
			_tasks.push(props);
			reply(props);
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
			var id = props.id;
			for(var i = 0; i < _tasks.length; i++){
				var obj = _tasks[i];
				if(obj.id == id){
					_tasks.splice(i, 1, props);
					break;
				}
			}
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
			for(var i = 0; i < _tasks.length; i++){
				var obj = _tasks[i];
				if(obj.id == parseInt(id)){
					_tasks.splice(i, 1);
					break;
				}
			}
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
			var task = null;
			for(var i = 0; i < _tasks.length; i++){
				var obj = _tasks[i];
				if(obj.id == parseInt(id)){
					task = _tasks[i];
					break;
				}
			}
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
			reply(_tasks);
		}
	}
});