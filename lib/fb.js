(function() {

var drty = require('drty'),
	JSON = require('./deps/json2').JSON

exports.FB = drty.Class.extend({
	initialize: function (userId, accessToken) {
		this.userId = userId;
		this.accessToken = accessToken;

		this.client = require('http').createClient(443, 'graph.facebook.com', true);
	},

	me: function(callback) {
		this.makeRequest(this.userId, callback);
	},
	
	user: function(userId, callback) {
		this.makeRequest('/' + userId, callback);
	},
	
	friends: function(callback) {
		this.makeRequest('/me/friends', callback);
	},

	makeRequest: function(url, callback) {
		url = url + '?access_token=' + this.accessToken;

		var request = this.client.request('GET', url, {host: 'graph.facebook.com'}),
			data = '';
		request.end();
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
	}
});

})();
