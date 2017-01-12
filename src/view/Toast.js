var d = mvdom; // external lib
var app = require("../js-app/app.js");


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
			app.class.add(view.el, "multi-line");
		}
		var controlDisappear = data.controlDisappear;
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var width = view.el.clientWidth;
		var height = view.el.clientHeight;
		view.el.style.left = ((winWidth - width) / 2) + "px";
		view.el.style.top = ((winHeight - height) / 2) + "px";

		if(!controlDisappear){
			app.class.add(view.el, "show");
			setTimeout(function(){
				app.class.remove(view.el, "show");
				d.on(view.el, "webkitTransitionEnd", function(){
					d.remove(view.el);
				});
			}, timeout);
		}else{
			app.class.add(view.el, "transitioning-fast show");
			app.class.remove(view.el, "transitioning");
		}
	},
	close: function(){
		var view = this;
		setTimeout(function(){
			app.class.remove(view.el, "show");
			d.on(view.el, "webkitTransitionEnd", function(){
				d.remove(view.el);
			});
		}, 0);
	}

});

