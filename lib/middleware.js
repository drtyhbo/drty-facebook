(function() {

var drty = require('drty'),
	FB = require('./fb').FB;

exports.FacebookMiddleware = drty.Class.extend({
	initialize: function() {
		var settings = drty.conf.settings.FB;
		if (!settings || !settings.APP_ID) {
			throw new Error('Configuration error. You must specify the following settings to use drty-facebook:\n\
		    	FB: {\n\
					API_KEY: "FACEBOOK API KEY"\n\
				}');
		}

		this.appId = settings.APP_ID;
	},

	handleRequest: function(request, response, next) {
		var uid = null, accessToken = null;

		var fb = null;
		if (!request.session || !request.session.fb) {
			var cookie = request.cookies['fbs_' + this.appId];
			if (cookie) {
				cookie = cookie.substr(1, cookie.length - 2);

				var pieces = {},
					components = cookie.split('&');
				for (var i = 0, component; (component = components[i]); i++) {
					var parts = component.split('=');
					pieces[parts[0]] = parts[1];
				}

				appId = this.appId;
				uid = pieces.uid;
				accessToken = pieces.access_token;
			
				fb = {
					uid: uid,
					accessToken: accessToken
				};
			}
		} else {
			fb = request.session.fb;
		}

		if (fb) {
			request.fb = new FB(this.appId, fb.uid,
				fb.accessToken);
			if (request.session) { request.session.fb = fb; }
		}

		next();
	}
});

})();