{% extends "base.tpl" %}

{% block head %}
<style type="text/css">
	body {
		font-size: 11px;
		font-family: Tahoma;
	}
	.fb_user {
		width: 120px;
		margin: 0px 10px 10px 0px;
		padding: 5px;
		background: #eee;
		text-align: center;
		float: left;
	}
</style>
{% endblock %}

{% block content %}
<div class="fb_user">
<fb:profile-pic uid="{{ me.id }}" width="100" height="100"></fb:profile-pic>
Me!
</div>

{% for friend in friends %}
<div class="fb_user">
<fb:profile-pic uid="{{ friend.id }}" width="100" height="100"></fb:profile-pic>
{{ friend.name }}
</div>
{% endfor %}

{% endblock %}