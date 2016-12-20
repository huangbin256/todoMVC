var d = mvdom;
var taskHub = d.hub("taskHub");


// Subcribe to a topic 
// sub(topic,[labels,] handlerFunction, namespace) 
taskHub.sub("Task",function(data, info){
    console.log("topic: ", info.topic, ", label: ", info.label, ", data: ", data);
},{ns:"namespace"});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "create", function(data, info){
	data = data || {};
	return app.post("/task-create", {props: JSON.stringify(data)});
});

// or can subscribe only to the create label (here info.label will always be "update") 
taskHub.sub("Task", "update", function(data, info){
	data = data || {};
	return app.post("/task-update", {props: JSON.stringify(data)});
});

// or can subscribe only to the delete label (here info.label will always be "delete")
taskHub.sub("Task", "delete", function(data, info){
	return app.post("/task-delete", {id: data});
});

taskHub.list =  function(){
	return app.get("/task-list");
}

taskHub.get =  function(taskId){
	return app.get("/task-get",{id:taskId});
}


window.taskHub = taskHub;