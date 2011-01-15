(function() {

var drty = require('drty'),
	JSON = require('./deps/json2').JSON

exports.FB = drty.Class.extend({
	initialize: function (appId, uid, accessToken) {
		this.appId = appId;
		this.uid = uid;
		this.accessToken = accessToken;
	},

	me: function(callback) {
		this.makeRequest(this.uid, callback);
	},
	
	user: function(uid, callback) {
		this.makeRequest('/' + uid, callback);
	},
	
	friends: function(callback) {
		this.makeRequest('/me/friends', function(error, data) {
			if (data) { data = data.data; }
			callback(error, data);
		});
	},

	makeRequest: function(url, callback) {
		url = url + '?access_token=' + this.accessToken;

		var request = require('http')
			.createClient(443, 'graph.facebook.com', true)
			.request('GET', url, {host: 'graph.facebook.com'});			

		var data = '';
		request.on('response', function(response) {
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				data += chunk;
			});
			response.on('end', function() {
				data = JSON.parse(data);
				callback(data.error ? new Error(data.error) : null, data);
			});
		});
		request.end();
	}
});

})();
