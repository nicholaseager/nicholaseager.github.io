---
layout: blank
sitemap: false
---

{% include image.html src="profile-square_7r8XDOfQj" class="profile-image" %}

#### Latest YouTube
{% include latest-youtube.html %}

#### Latest Travel Guides
{% assign guides = site.guides | reverse %}
{% include latest-collection.html items=guides %}

<center><h4>Other Links</h4></center>
<div class="links-container">
    <a href="https://www.patreon.com/NicholasEager" class="link">
        <i class="fab fa-patreon" aria-hidden="true"></i>
        Patreon
    </a>
    <a href="https://www.instagram.com/nicholas.eager/" class="link">
        <i class="fab fa-instagram" aria-hidden="true"></i>
        Instagram
    </a>
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