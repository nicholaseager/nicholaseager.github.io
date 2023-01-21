---
layout: home
jsonld: home
title: Adventure Film
description: Nicholas Eager Adventure Film and Photography
image: photos/countries/nepal/mardi-himal/frozen-prayer-flags-in-front-of-fishtail-mountain
---

### Latest Film

{% include latest-youtube.html %}

I spend a lot of my time exploring and documenting exciting and unique locations, activities, and cultures. I am responsible for all aspects of the filmmaking process, including planning and executing shoots, as well as editing and post-production work. Want to come along? <a href="https://www.youtube.com/channel/UCv-z2Q0Ucx8lxq8mvYRK28g?sub_confirmation=1" target="_blank">Subscribe to my channel</a> on YouTube.

<a href="https://www.youtube.com/channel/UCv-z2Q0Ucx8lxq8mvYRK28g" class="button button--small">Explore All Film</a>

---

### Latest Travel Guides

{% assign guides = site.guides | reverse %}
{% include latest-collection.html items=guides %}

<a href="{{ "/guides/" | relative_url }}" class="button button--small">Explore Travel Guides</a>

---

### Photography

{% include gallery.html
	orderable=true
	tags="showcase"
%}

Sometimes a single photo is all you need to tell a story. Select a picture to order a print and share the story in your home.

<a href="{{ "/galleries" | relative_url }}" class="button button--small">Explore Galleries</a>

---

### What They Say

{% include latest-testimonials.html %}

<a href="{{ "/testimonials" | relative_url }}" class="button button--small">See All Testimonials</a>

---

### Ready To Work Together?

For business inquiries, such as a collaboration or licensing, please contact me. Read more about <a href="{{ "/how-to-use-my-art" | relative_url }}">how to use my art</a>.

<a href="{{ "/contact" | relative_url }}" class="button button--small">Get In Touch</a>
