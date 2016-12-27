var d = mvdom; // external lib

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("DOM fully loaded and parsed");
	d.display("MainView", d.first("body")).then(function(){
		app.ctx.init();
	});
});
