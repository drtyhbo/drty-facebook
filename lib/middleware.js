(function() {

var drty = require('drty'),
	FB = require('./fb').FB;

	var apiKey = config['API_KEY'],
		apiSecret = config['API_SECRET'],
		xdReciever = config['XD_RECIEVER'];

	drty.urls.add('^/xd_reciever.htm$', 'static', xdReciever);


exports.FacebookMiddleware = drty.Class.extend({
	initialize: function() {
		var settings = drty.conf.settings.FB;
		if (!settings || !settings.API_KEY) {
			throw Error('Configuration error. You must specify the following settings to use drty-facebook:\n\
		    	FB: {\n\
					API_KEY: "FACEBOOK API KEY"\n\
				}');
			}
		}

		this.apiKey = settings.API_KEY;
	},

	handleRequest: function(request, response, next) {
		var uid, accessToken;

		if (request.session.fb) {
			uid = request.session.fb.uid;
			accessToken = request.session.fb.accessToken;
		} else {
			var cookie = request.cookies['fbs_' + this.apiKey];
			if (!cookie) { return null; }
			cookie = cookie.substr(1, cookie.length - 2);

			var pieces = {},
				components = cookie.split('&');
			for (var i = 0, component; (component = components[i]); i++) {
				var parts = component.split('=');
				pieces[parts[0]] = parts[1];
			}

			uid = pieces.uid;
			accessToken = pieces.accessToken;
			
			request.session.fb = {
				uid: uid,
				accessToken: accessToken
			};
		}

		request.fb = new FB(uid, accessToken);
		next();
	}
});

})();