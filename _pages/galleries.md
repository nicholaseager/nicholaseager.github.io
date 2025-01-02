---
layout: collection
jsonld: collection
title: Galleries
description: Every country and region offers distinctive natural landscapes and phenomena that can be explored through the lens, providing a photographer with the opportunity to capture one-of-a-kind and exquisite photographs of nature, from the grandest landscapes to the subtlest details.
---

{% assign galleries = site.galleries %}
{% include collection.html items=galleries %}
