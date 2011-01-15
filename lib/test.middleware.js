var drty = require('drty'),
	FacebookMiddleware = require('./middleware').FacebookMiddleware,
	testCase = require('nodeunit').testCase;

APP_ID = '0123456789';
UID = '9876543210';
ACCESS_TOKEN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = testCase({
	'configuration': function(test) {
		test.throws(function() {
			var middleware = new FacebookMiddleware();
		});

		drty.conf.settings.FB = {
			APP_ID: APP_ID
		};
		test.doesNotThrow(function() {
			var middleware = new FacebookMiddleware();
		});
		
		test.done();
	},

	'handleRequest with sessions disabled': function(test) {
		var request = {
			cookies: {
				fbs_0123456789: '"uid='+ UID + '&access_token=' + ACCESS_TOKEN + '"'
			}
		};
		
		var middleware = new FacebookMiddleware();
		middleware.handleRequest(request, null, function() {
			test.ok(request.fb)
			test.equal(request.fb.appId, APP_ID);
			test.equal(request.fb.uid, UID);
			test.equal(request.fb.accessToken, ACCESS_TOKEN);

			test.done();
		});
	},
	
	'handleRequest with sessions enabled': function(test) {
		var request = {
			cookies: {
				fbs_0123456789: '"uid='+ UID + '&access_token=' + ACCESS_TOKEN + '"'
			},
			session: {
				
			}
		};
		
		var middleware = new FacebookMiddleware();
		middleware.handleRequest(request, null, function() {
			test.ok(request.fb)
			test.equal(request.fb.appId, APP_ID);
			test.equal(request.fb.uid, UID);
			test.equal(request.fb.accessToken, ACCESS_TOKEN);
			test.ok(request.session.fb)
			test.equal(request.session.fb.uid, UID);
			test.equal(request.session.fb.accessToken, ACCESS_TOKEN);

			test.done();
		});	
	},
	
	'handleRequest from session': function(test) {
		var request = {
			session: {
				fb: {
					uid: UID,
					accessToken: ACCESS_TOKEN
				}
			}
		};
		
		var middleware = new FacebookMiddleware();
		middleware.handleRequest(request, null, function() {
			test.ok(request.fb)
			test.equal(request.fb.appId, APP_ID);
			test.equal(request.fb.uid, UID);
			test.equal(request.fb.accessToken, ACCESS_TOKEN);

			test.done();
		});		
	}
});
