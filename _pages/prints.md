---
title: Prints
description: Thank you for your interest in my art! Select any photo to order a print.
---

## Places

{% assign places = site.places | reverse %}
{% include latest-collection.html items=places %}

Every country and region offers distinctive natural landscapes and phenomena that can be explored through the lens, providing a photographer with the opportunity to capture one-of-a-kind and exquisite photographs of nature, from the grandest landscapes to the subtlest details.

## Themes

{% assign themes = site.themes | reverse %}
{% include latest-collection.html items=themes %}

The countless styles and themes that photography has to offer continually inspire me as a photographer. Every style and theme offers a different set of difficulties and opportunities for artistic expression.

## Showcase

{% include gallery.html
	orderable=true
	tags="showcase"
%}