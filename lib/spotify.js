var request = require('superagent'),
	endpoints = require("./endpoints.json");

function SpotifyAPI() {
	this.baseurl = endpoints.baseurl;
	return this;
}

var methods = endpoints.methods;
Object.keys(methods).forEach(function(method){
	Object.keys(methods[method]).forEach(function(obj){
		var methodName = method + capitalizeFirstLetter(obj);
		SpotifyAPI.prototype[methodName] = function(params, fn) {
			if (typeof params == "function") {
				fn = params;
				params = {};
			}
			var endpoint = methods[method][obj];
			execMethod.call(this, endpoint.type, params, endpoint.resource, fn);

			return this;
		};
	});
});

function execMethod(type, params, endpoint, fn){
	params = params || {};
	type = type.toUpperCase();

	var req = request(type, this.baseurl + endpoint)
				.set('Accept', 'application/json');

	if (type === "GET") {
		req.query(params);
	}
	else {
		req.send(params);
	}

	req.end(function(res) {
		if(res.ok) fn(null, res.body);
    	else if(res.body && res.body.status_message) fn(new Error(res.body.status_message), null);
    	else fn(new Error(res.text), null);
	});
}

function capitalizeFirstLetter(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}


module.exports = function() {
	return new SpotifyAPI();
};
