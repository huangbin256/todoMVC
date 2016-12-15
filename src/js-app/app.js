
module.exports = {
	get: get,
	post: post
};


// put in the global scope
window.app = module.exports;

// --------- AJAX Wrapper --------- //
// Very simple AJAX wrapper that allow us to simply normalize request/response, and eventually put some hooks such as
// performance and error reporting. 


//////
// Extremely simple XHR Promise wrapper. 
// 
// Inspired from: http://blog.garstasio.com/you-dont-need-jquery/ajax/
//////

var GET = "GET", POST = "POST";

// --------- Public API --------- //
function get(url,params){
	return doXhr(GET, url, params);
}

function post(url,params){
	return doXhr(POST, url, params);
}
// --------- /Public API --------- //

function doXhr(method, url, params){

	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		var uri = encodeURI(url);
		
		if (method === GET){
			var hasParams = (params)?true:false;
			if (hasParams){
				uri += "?" + encodeParams(params);
			}
		}

		xhr.open(method, uri);

		if (method === POST){
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');	
		}

		xhr.onload = function() {
			if (xhr.status === 200) {
				resolve (JSON.parse(xhr.responseText));
			}
			else if (xhr.status !== 200) {
				reject(new Error("HTTP XHR ERROR - " + xhr.status + " error for [" + uri + "] " ));
			}
		};

		if (method === POST){
			xhr.send(encodeParams(params));
		}else{
			xhr.send();	
		}
		
	});
}


function encodeParams(object) {
	var encodedString = '';
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) {
			if (encodedString.length > 0) {
				encodedString += '&';
			}
			encodedString += encodeURI(prop + '=' + object[prop]);
		}
	}
	return encodedString;
}
