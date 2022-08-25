---
title: Hello, Instagram!
description: Nicholas Eager Photography
---

{% include image.html src="profile" %}

I am an international adventure photographer and film-maker. I specialize in documenting all of the tiny, special moments from off the beaten path adventures around the world.

---

#### Latest YouTube
{% include latest-youtube.html %}

---

{% for post in site.posts limit:1 %}
#### Latest Blog Post
<img src="{{ post.image }}"/>
### {{ post.title }}
{{ post.description }}
 <a href="{{ post.url | relative_url }}">Read More</a>
{% endfor %}

---

<a href="{{ "/testimonials" | relative_url }}" class="button button--small">Testimonials</a>

<a href="/" class="button button--small">My Portfolio</a>

<a href="{{ "/about" | relative_url }}" class="button button--small">About Me</a>

<br>

<center>
{% include kofi.html %}
</center>