var drty = require('drty'),
	facebook = require('drty-facebook');

exports.settings = {
	DATABASE: {
		ENGINE: drty.db.backends.MySQL,
		NAME: 'DATABASE NAME',
		USER: 'USERNAME',
		PASSWORD: 'PASSWORD',
		HOST: '',
		PORT: ''
	},
	TEMPLATE_DIRS: [
		require('path').join(__dirname, 'templates')
	],
	INSTALLED_APPS: [
	],
	MIDDLEWARE_CLASSES: [
		drty.contrib.sessions.middleware.SessionMiddleware,
		facebook.middleware.FacebookMiddleware
	],
	
	FB: {
		APP_ID: 'APP_ID'
	},

	SESSION_ENGINE: drty.contrib.sessions.backends.cache,

	ROOT_URLCONF: require('./urls').urlpatterns
};