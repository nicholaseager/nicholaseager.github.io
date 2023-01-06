---
layout: page
title: Adventure Photography Gear
subtitle: All of the gear I genuinely like and use, and recommend to try out for yourself. I will constantly update this list when I find and include new gear.
---

<div class="gear-gallery-wrap">
  <div id="gear-buttons" class="gear-buttons">
    <button class="button button--small active" onclick="filterSelection('all')">All</button>
    <button class="button button--small" onclick="filterSelection('filming')">Filming</button>
    <button class="button button--small" onclick="filterSelection('travel')">Travel</button>
    <button class="button button--small" onclick="filterSelection('hiking')">Hiking</button>
  </div>
    <div class="gear-gallery">
        {% for gear in site.data.gear %}
        <div class="gear-gallery-image {{ gear.tags }}">
          <a href="{{ gear.url }}">
            <img src="{{ gear.img }}" alt="{{ gear.title }}"/>
          </a>
        </div>
        {% endfor %}
    </div>
</div>

<script src="{{ '/js/gear.js' | relative_url }}"></script>