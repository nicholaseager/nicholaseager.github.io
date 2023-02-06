---
layout: page
jsonld: collection
title: Adventure Photography Gear
description: All of the gear I genuinely like and use, and recommend to try out for yourself. I will constantly update this list when I find and include new gear.
---

<div class="gear-wrap">
  <div id="gear-buttons" class="gear-buttons">
      <button class="button button--large active" data-tag="all">All</button>
      <button class="button button--large" data-tag="filming">Filming</button>
      <button class="button button--large" data-tag="travel">Travel</button>
      <button class="button button--large" data-tag="hiking">Hiking</button>
  </div>
  <div class="gear-gallery-wrap">
      <div id="gear-gallery" class="gear-gallery">
        {% for gear in site.data.gear %}
        <div class="gear-gallery-image {{ gear.tags }}">
          <a href="{{ gear.url }}">
            <img src="{{ gear.img }}" alt="{{ gear.title }}"/>
          </a>
        </div>
        {% endfor %}
    </div>
  </div>
</div>