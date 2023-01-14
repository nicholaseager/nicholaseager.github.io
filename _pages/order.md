---
layout: page
title: Order
description: Something
---

<img id="order-photo" src="https://ik.imagekit.io/qn1gkawvy/tr:w-1280/photos/countries/nepal/mardi-himal/frozen-prayer-flags-in-front-of-fishtail-mountain.jpg">

<script>
    const searchParams = new URLSearchParams(window.location.search);
    const src = decodeURIComponent(searchParams.get('id'));
    const image = document.getElementById('order-photo');
    image.setAttribute('src', 'https://ik.imagekit.io/qn1gkawvy/tr:w-1280/' + src + '.jpg');
</script>