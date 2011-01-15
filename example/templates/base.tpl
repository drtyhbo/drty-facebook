<head>
	{% block head %}{% endblock %}
</head>

<body>
    <div id="fb-root"></div>
	<script src="http://connect.facebook.net/en_US/all.js"></script>
	<script>
		FB.init({ 
			appId: 'APP_ID',
			cookie: true, 
			status: true,
			xfbml: true 
		});
	</script>
	{% block content %}{% endblock %}
</body>