var d = mvdom; // external lib
var app = require("../js-app/app.js");
var render = require("../js-app/render.js").render;


d.register("Toast", {
	
	create: function(data){
		data = data || {};
		var message = data.message || "";
		return render("tmpl-Toast", {message: message});
	},
	postDisplay: function(data){
		var view = this;
		data = data || {};
		var timeout = data.timeout || 4000;
		if(data.multiLine){
			view.el.innerHTML = data.html;
			view.el.classList.add("multi-line");
		}
		var controlDisappear = data.controlDisappear;
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var width = view.el.clientWidth;
		var height = view.el.clientHeight;
		view.el.style.left = ((winWidth - width) / 2) + "px";
		view.el.style.top = ((winHeight - height) / 2) + "px";

		if(!controlDisappear){
			view.el.classList.add("show");
			setTimeout(function(){
				view.el.classList.remove("show");
				d.on(view.el, "webkitTransitionEnd", function(){
					d.remove(view.el);
				});
			}, timeout);
		}else{
			view.el.classList.add("transitioning-fast show");
			view.el.classList.remove("transitioning");
		}
	},
	close: function(){
		var view = this;
		setTimeout(function(){
			view.el.classList.remove("show");
			d.on(view.el, "webkitTransitionEnd", function(){
				d.remove(view.el);
			});
		}, 0);
	}

});

