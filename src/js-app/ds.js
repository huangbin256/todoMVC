var d = mvdom; // global lib dependency
var app = require("./app.js");


/*
	"ds" is a client data service that perform all of the 
	CRUD operation on the core data objects. 

	- All APIs are Promise based
	- When connected to the server, uses the app.do[REST] ajax methods
	
	Note: Currently this dataservice use a local inmemory datastore (see below)
*/
module.exports = {
	create: create, 
	get: get,
	update: update, 	
	list: list,
	"delete": remove
}

// --------- Public API --------- //
function create(type, entity){
	return new Promise(function(resolve, reject){
		app.doPost("/"+type+"-create", {props: JSON.stringify(entity)}).then(function(result){
			resolve(result);

			// we publish the dataservice event
			d.hub("dsHub").pub(type,"create",result);
		});
	});
}

function update(type, id, entity){
	return new Promise(function(resolve, reject){
		if (id){
			var data = Object.assign({id: id}, entity);

			app.doPost("/"+type+"-update", {props: JSON.stringify(entity)}).then(function(result){
				// we resolve 
				resolve(result);

				// we public the dataservice event
				d.hub("dsHub").pub(type, "update", result);
			});

		}else{
			reject("Cannot update entity " + type + " because [" + id + "] not found");
		}
	})
}

function get(type, id){
	return new Promise(function(resolve, reject){
		app.doGet("/"+type+"-get",{id:id}).then(function(result){
			resolve(result);
		});
	});
}

function list(type, filter){
	// TODO: need to add the filtering support
	return new Promise(function(resolve, reject){
		app.doGet("/"+type+"-list",filter).then(function(result){
			resolve(result);
		});
	})
	
}

function remove(type, id){
	return new Promise(function(resolve, reject){
		app.doPost("/"+type+"-delete", {id: id}).then(function(result){
			resolve(result);

			// we publish the dataservice event
			d.hub("dsHub").pub(type,"delete",id);	
		});	
	})
}
// --------- /Public API --------- //
