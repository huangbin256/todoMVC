var d = mvdom; // external lib
var app = require("../js-app/app.js");

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
		app.doPost("/login", data).then(function(response){
			if (response.success){
				app.pref.set("username", data.username)
				window.location.reload(true);
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


