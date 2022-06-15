---
layout: default
title: Gear
---

<section class="listing">

	<div class="content-wrap listing-wrap">

		{% for gear in site.data.gear.gear_items %}

		<div class="listing-item">

			<a class="listing-item__link" href="{{ gear.url }}">

				<div class="listing-item__image">
					<img src="{{ gear.img }}" alt="{{ gear.title }}">
				</div>

				<div class="listing-item__content listing-item__content--{{ site.data.settings.grid_settings.content_alignment }}">
					<div class="listing-item__info">
						<h2 class="listing-item__title">{{ gear.title }}</h2>
						<p class="listing-item__subtitle">{{ gear.subtitle }}</p>
					</div>
				</div>

			</a>

		</div>

		{% endfor %}

	</div>

</section>