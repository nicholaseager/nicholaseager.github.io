---
layout: blank
---

{% include image.html src="profile-square_7r8XDOfQj" class="profile-image" %}

<div class="links-container">
    <a href="https://www.youtube.com/c/NicholasEager/" class="link">
        <i class="fab fa-youtube" aria-hidden="true"></i>
        YouTube
    </a>
    <a href="https://www.instagram.com/nicholas.eager/" class="link">
        <i class="fab fa-instagram" aria-hidden="true"></i>
        Instagram
    </a>
    <a href="https://store.nicholaseager.com" class="link">
        <i class="fas fa-image" aria-hidden="true"></i>
        Prints
    </a>
    <a href="{{ "/gear" | relative_url }}" class="link">
        <i class="fas fa-camera" aria-hidden="true"></i>
        Gear
    </a>
    <a href="{{ "/contact" | relative_url }}" class="link">
        <i class="fas fa-envelope" aria-hidden="true"></i>
        Collaboration
    </a>
</div>

---

#### Latest YouTube
{% include latest-youtube.html %}

---

{% assign guides = site.guides | reverse %}
{% for guide in guides limit:1 %}
#### Latest Travel Guide
{% include image.html src=guide.image %}
### {{ guide.title }}
{{ guide.description }}
 <a href="{{ guide.url | relative_url }}">Read More</a>
{% endfor %}