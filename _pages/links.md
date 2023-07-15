---
layout: blank
sitemap: false
---

{% include image.html src="profile-square_7r8XDOfQj" class="profile-image" %}

#### Latest YouTube
{%- assign films = site.data.films | reverse -%}
{% for film in films limit:1 %}
<iframe width="16" height="9"
    src="https://www.youtube-nocookie.com/embed/{{ film.id }}?autoplay=1&modestbranding=1&iv_load_policy=3&theme=light&playsinline=1&mute=1"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    scrolling="no"
></iframe>
{% endfor %}

#### Behind the Scenes

<iframe
    src="https://www.instagram.com/nicholas.eager/embed"
    width="540" height="600"
    allowtransparency="true"
    allowfullscreen="true"
    frameborder="0"
    data-instgrm-payload-id="instagram-media-payload-0"
    scrolling="no"
    style="background: white; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px; padding: 0px;">
</iframe>

#### Latest Travel Guides
{% assign guides = site.guides | reverse %}
{% include latest-collection.html items=guides %}

<center><h4>Other Links</h4></center>
<div class="links-container">
    <a href="{{ "/gear" | relative_url }}" class="link">
        <i class="fas fa-camera" aria-hidden="true"></i>
        Gear
    </a>
    <a href="{{ "/photos" | relative_url }}" class="link">
        <i class="fas fa-image" aria-hidden="true"></i>
        Prints
    </a>
    <a href="{{ "/contact" | relative_url }}" class="link">
        <i class="fas fa-envelope" aria-hidden="true"></i>
        Collaboration
    </a>
</div>