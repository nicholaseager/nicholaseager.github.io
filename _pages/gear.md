---
layout: default
title: Adventure Photography Gear
subtitle: All of the gear I genuinely like and use, and recommend to try them out for yourself.
items:
  - title: 'Main Camera'
    description: 'My main video and photo camera.'
    url: 'https://amzn.to/3mNkAV8'
    img: 'https://m.media-amazon.com/images/I/91L2tiLsIJL._AC_SL1500_.jpg'
  - title: 'Main Lens'
    description: 'My main lens for video.'
    url: 'https://amzn.to/3wGvq57'
    img: 'https://m.media-amazon.com/images/I/71eIBni4g+L._AC_SX679_.jpg'
  - title: 'Telephoto Lens'
    description: 'My telephoto lens primarily for photos.'
    url: 'https://amzn.to/3MVlYQj'
    img: 'https://m.media-amazon.com/images/I/81GhASxQ7LL._AC_SL1500_.jpg'
  - title: 'Microphone'
    description: 'My main microphone.'
    url: 'https://amzn.to/3xrAsBH'
    img: 'https://m.media-amazon.com/images/I/81biA-3t-WL._AC_SL1500_.jpg'
  - title: 'Drone'
    description: 'My main drone.'
    url: 'https://amzn.to/3LLJApH'
    img: 'https://stormsend1.djicdn.com/tpc/uploads/carousel/image/a4eb1ddaf35330021088d17083746baf@ultra.jpg'
  - title: 'Main Tripod'
    description: 'My main tripod for short or easy adventures.'
    url: 'https://amzn.to/3wFNood'
    img: 'https://m.media-amazon.com/images/I/81+1RGqD5AL._AC_SL1500_.jpg'
  - title: 'Mini Tripod'
    description: 'My tripod for long or difficult adventures.'
    url: 'https://amzn.to/3lGatkx'
    img: 'https://m.media-amazon.com/images/I/51YVJtmxGAL._AC_SL1081_.jpg'
  - title: 'GPS Watch'
    description: 'The watch I use for tracking my hikes.'
    url: 'https://amzn.to/3QiZSKx'
    img: 'https://m.media-amazon.com/images/I/61-x+PFm6xL._AC_SL1440_.jpg'
  - title: 'Portable Camera Case'
    description: 'A case I use for my camera when it is inside my backpack.'
    url: 'https://amzn.to/3lJ01Zj'
    img: 'https://m.media-amazon.com/images/I/91cJha2cFOL._AC_SL1500_.jpg'
  - title: 'Powerbank'
    description: 'A reliable powerbank that can charge my camera batteries and phone for a few days.'
    url: 'https://amzn.to/3MJPWr0'
    img: 'https://m.media-amazon.com/images/I/61Fs2NAB7CL._AC_SL1500_.jpg'
  - title: 'Memory Cards'
    description: 'Memory cards for shooting 4K60 video.'
    url: 'https://amzn.to/3GgIC40'
    img: 'https://m.media-amazon.com/images/I/61ao4RlOuCL._AC_SL1000_.jpg'
  - title: 'Backpack'
    description: 'My main hiking backpack.'
    url: 'https://amzn.to/3Nth3Xm'
    img: 'https://m.media-amazon.com/images/I/51MHzDC90gL._AC_SL1000_.jpg'
  - title: 'Daypack'
    description: 'My collapsible daypack.'
    url: 'https://amzn.to/3lDPXRn'
    img: 'https://m.media-amazon.com/images/I/819S3PLnxzL._AC_SL1500_.jpg'
  - title: 'Headlamp'
    description: 'A very bright headlamp.'
    url: 'https://amzn.to/3GgIEZG'
    img: 'https://m.media-amazon.com/images/I/71ODVXv3QfL._AC_SL1500_.jpg'
  - title: 'Shoes'
    description: 'Always Altras for hiking in a dry climate.'
    url: 'https://amzn.to/3NOvdmx'
    img: 'https://m.media-amazon.com/images/I/81ZXlj29cGL._AC_UX695_.jpg'
  - title: 'Socks'
    description: 'The most durable and comfy socks I have ever worn.'
    url: 'https://amzn.to/3Hok5dy'
    img: 'https://m.media-amazon.com/images/I/81xM7PfnrXL._AC_UX679_.jpg'
---

<section class="intro">

	<div class="wrap">

		<h1>{{ page.title }}</h1>
		<p>{{ page.subtitle }}</p>

	</div>

</section>

<div class="gear-wrapper">
{% for gear in page.items %}
	<a href="{{ gear.url }}">
		<div class="gear-item">
			<img src="{{ gear.img }}">
			<div>
				<h4>{{ gear.title }}</h4>
				<p>{{ gear.description }}</p>
			</div>
		</div>
	</a>
{% endfor %}

<hr>

<p>Disclaimer: Some of the links above are affiliate links. Buying anything through these links doesn’t cost you anything extra, but does support me. Anything I link, I genuinely like and use, and recommend you try them out for yourself. Thank you for the support!</p>
</div>