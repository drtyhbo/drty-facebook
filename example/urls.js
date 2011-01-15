var drty = require('drty'),
	urls = drty.urls,
	directToTemplate = drty.views.generic.simple.directToTemplate;

exports.urlpatterns = urls.patterns(
	urls.url('^/$', function(request, response) {
			directToTemplate(request, response, 'index.tpl');
		}, 'root'),
	urls.url('^/home/$', [
			function(request, response, next) {
				if (!request.fb) { response.redirect(drty.urls.reverse('root')); }
				else { next(); }
			},
			function(request, response) {
				request.fb.me(function(error, me) {
					request.fb.friends(function(error, friends) {
						console.log(friends);
						directToTemplate(request, response, 'home.tpl', {
							me: me,
							friends: friends.data
						});						
					});
				});
			}
		], 'home'),
	urls.url('^/xd_reciever.htm$', drty.views.static.serve, 'xd_reciever', [
		require('path').join(__dirname, 'templates/xd_reciever.htm')])
);