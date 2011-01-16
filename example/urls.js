var drty = require('drty'),
	patterns = drty.urls.patterns,
	url = drty.urls.url,
	directToTemplate = drty.views.generic.simple.directToTemplate;

exports.urlpatterns = patterns(
	url('^/$', 'root', function(request, response) {
			directToTemplate(request, response, 'index.tpl');
		}),
	url('^/home/$', 'home', [
			function(request, response, next) {
				if (!request.fb) { response.redirect(drty.urls.reverse('root')); }
				else { next(); }
			},
			function(request, response) {
				request.fb.me(function(error, me) {
					request.fb.friends(function(error, friends) {
						directToTemplate(request, response, 'home.tpl', {
							me: me,
							friends: friends,
							request: request
						});						
					});
				});
			}
		]),
	url('^/xd_reciever.htm$', 'xd_reciever', drty.views.static.serve,
		require('path').join(__dirname, 'templates/xd_reciever.htm'))
);