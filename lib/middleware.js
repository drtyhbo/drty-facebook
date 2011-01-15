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

		if (request.session.fb) {
			appId = request.session.fb.appId;
			uid = request.session.fb.uid;
			accessToken = request.session.fb.accessToken;
		} else {
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
			
				request.session.fb = {
					appId: appId,
					uid: uid,
					accessToken: accessToken
				};
			}
		}

		if (uid && accessToken) {
			request.fb = new FB(appId, uid, accessToken);
		}
		next();
	}
});

})();