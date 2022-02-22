---
title: Hello, Instagram!
description: Nicholas Eager Photography
---

<figure>
<img src="https://d10smlm4r150o9.cloudfront.net/profile.jpeg">
<br>
<figcaption align = "center">Photo by <a href="https://www.instagram.com/pippymaru/">@pippymaru</a></figcaption>
</figure>

I am Nicholas Eager: Husband, Photographer, Software Engineer, Runner, Designer, Filmmaker, and Adventurer.

---

{% for post in site.posts limit:1 %}
#### Latest Blog Post
<img src="{{ post.featured_image }}"/>
### {{ post.title }}
{{ post.description }}
 <a href="{{ post.url | relative_url }}">Read More</a>
{% endfor %}

---

#### Latest YouTube
{% include latest-youtube.html %}

---

<a href="{{ "/prints" | relative_url }}" class="button button--small">Get Prints!</a>

<a href="/" class="button button--small">My Portfolio</a>

<a href="{{ "/about" | relative_url }}" class="button button--small">About Me</a>

<br>

<center>
{% include kofi.html %}
</center>