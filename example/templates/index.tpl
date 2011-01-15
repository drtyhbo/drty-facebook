{% extends "base.tpl" %}

{% block content %}
	<script>
		var FB_PERMISSION_STR = 'publish_stream,offline_access,email,email';
		function isLoggedIn(response) {
			if (response.session && response.perms) {
				window.location = '{% url "home" %}';
			}
		}

		FB.getLoginStatus(isLoggedIn);		
		function fbLogin() {
			FB.login(isLoggedIn, {perms: FB_PERMISSION_STR});
	    };
	</script>

	<center>
		<h1>Facebook Test</h1>
		<fb:login-button onlogin="fbLogin">Login with Facebook</fb:login-button>
	</center>
{% endblock %}
