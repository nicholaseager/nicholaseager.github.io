---
layout: default
---

<section class="intro">

	<div class="wrap">

		<h1>Hiking Photography Gear</h1>
		<br><br>

	</div>

</section>

<section class="listing">

	<div class="content-wrap listing-wrap">

		{% for gear in site.data.gear.gear_items %}

		<div class="listing-item">

			<a class="listing-item__link" href="{{ gear.url }}">

				<div class="listing-item__image">
					<img src="{{ gear.img }}" alt="{{ gear.title }}">
				</div>

				<div class="listing-item__content listing-item__content">
					<div class="listing-item__info">
						<h2 class="listing-item__title">{{ gear.title }}</h2>
						<p class="listing-item__subtitle">{{ gear.subtitle }}</p>
					</div>
				</div>

			</a>

		</div>

		{% endfor %}

	</div>

    <br><br><br>
    <p>
    Disclaimer: Some of the links above are affiliate links. Buying anything through these links doesn’t cost you anything extra, but does supports me. Anything I link, I genuinely like and use, and recommend you try them out for yourself. Thank you for the support!
    </p>

</section>