---
title: Photos
description: Sometimes a single photo is all you need to tell a story. Browse my most unique stories.
image: photos/countries/nepal/mardi-himal/frozen-prayer-flags-in-front-of-fishtail-mountain
---

{% include gallery.html
	orderable=true
	tags="showcase"
%}

## Galleries

Every country and region offers distinctive natural landscapes and phenomena that can be explored through the lens, providing a photographer with the opportunity to capture one-of-a-kind and exquisite photographs of nature, from the grandest landscapes to the subtlest details. The countless styles and themes that photography has to offer continually inspire me as a photographer. Every style and theme offers a different set of difficulties and opportunities for artistic expression.

{% assign galleries = site.galleries %}
{% include latest-collection.html items=galleries %}

<a href="{{ "/galleries" | relative_url }}" class="button button--small">Explore All Galleries</a>