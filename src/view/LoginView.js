var d = mvdom; // external lib

/**
 * View: LoginView
 * Description: Show app login view.
 */

d.register("LoginView", {
	
	create: function(data, config) {
		return render("tmpl-LoginView");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //


	// --------- Events --------- //
	events: {
		"keyup; input": function(evt){
			var view = this;
			if(evt.keyCode == 13){
				var data = {};
				data.username = d.first("#input-username").value;
				data.pwd = d.first("#input-pwd").value;
				login.call(view, data);
			}
		},
		"click; .btn-login": function(evt){
			var view = this;
			var data = {};
			data.username = d.first("#input-username").value;
			data.pwd = d.first("#input-pwd").value;
			login.call(view, data);
		}
	},
	// --------- /Events --------- //


});

function login(data){
	var view = this;
	var message = validate.call(view, data);
	if(!message){
		app.post("/login", data).then(function(response){
			if (response.success){
				var contentEl = d.closest(view.el, ".MainView-content");
				d.display("TodoView", contentEl);
				d.remove(view.el);
			}else{
				message = response.errorMessage;
				if(message){
					var msgEl = d.first(view.el, ".error-msg");
					msgEl.innerHTML = message;
				}
			}
		});
	}else{
		if(message){
			var msgEl = d.first(view.el, ".error-msg");
			msgEl.innerHTML = message;
		}
	}

}

function validate(data){
	var view = this;
	var message = null;
	if(!data.username){
		message = "Username cannot be blank";
	}

	if(!data.pwd){
		message = "Password cannot be blank";
	}

	return message;
}


