{% extends "base.tpl" %}

{% block head %}
<style type="text/css">
	body {
		font-size: 11px;
		font-family: Tahoma;
	}
	.fb_user {
		width: 150px;
		margin: 0px 10px 10px 0px;
		padding: 5px;
		background: #eee;
		text-align: center;
		float: left;
	}
</style>
{% endblock %}

{% block content %}
<p>For running tests, please use the following token:

<p>App ID: <b>{{ request.fb.appId }}</b><br>
Access token: <b>{{ request.fb.accessToken }}</b>

<p>Here's you and your list of friends!

<div class="fb_user">
<fb:profile-pic uid="{{ me.id }}" width="100" height="100"></fb:profile-pic><br>
You!
</div>

{% for friend in friends %}
<div class="fb_user">
<fb:profile-pic uid="{{ friend.id }}" width="100" height="100"></fb:profile-pic><br>
<div>{{ friend.name }}</div>
</div>
{% endfor %}

{% endblock %}