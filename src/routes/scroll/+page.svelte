<script>
	import ChartV2 from '$lib/ChartV2.svelte';
	import data from '$lib/data.json';
	import Story from '$lib/Story.svelte';

	const storyHeight = 100;

	let viz;
	let step = 1;
	let width = 750;
	let height = 500;

	$: {
		if (viz) {
			const section$ = viz.querySelectorAll('.section');
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting && e.intersectionRatio >= 0.5) {
							step = +e.target.dataset.step + 1;
						}
					});
				},
				{
					threshold: [0, 0.25, 0.5, 0.75, 1]
				}
			);
			section$.forEach((section) => observer.observe(section));
		}
	}
</script>

<main>
	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>
	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>
	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>
	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>
	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>

	<div class="viz full-bleed" bind:this={viz}>
		<div class="sticky" bind:clientWidth={width} bind:clientHeight={height}>
			<ChartV2 {step} {data} {width} height={height - storyHeight} />
			<div class="story">
				<Story {step} {width} />
			</div>
		</div>

		<div class="section" data-step="1">1</div>
		<div class="section" data-step="2">2</div>
		<div class="section" data-step="3">3</div>
		<div class="section" data-step="4">4</div>
		<div class="section" data-step="5">5</div>
	</div>

	<div>
		<h3>Lorem Ipsum</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis
			ante, lobortis a risus consequat, condimentum sodales metus. Phasellus
			blandit et nulla sed gravida. Aenean consectetur massa vitae tincidunt
			pellentesque. Sed vestibulum quam sit amet dolor tempus porta. Duis ac
			diam lectus. Maecenas malesuada erat at massa elementum, a convallis nunc
			pharetra. Sed scelerisque, odio id laoreet porta, lacus leo dignissim
			magna, ac ultrices nibh velit sed lorem. Nullam cursus sit amet elit in
			tristique. Praesent mattis lacinia tempor. Fusce eget lorem vitae augue
			venenatis viverra. Aliquam vel imperdiet massa. Mauris euismod enim a mi
			malesuada, at viverra nulla dapibus. Donec nunc elit, egestas sed eros
			sed, mollis ultricies turpis. Nunc sed nisi neque. Aliquam eget velit
			luctus, commodo arcu ut, hendrerit metus.
		</p>
	</div>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		display: grid;
		grid-template-columns: 1fr min(32rem, 100%) 1fr;
	}

	main > * {
		grid-column: 2;
	}

	.full-bleed {
		width: 100%;
		grid-column: 1 / 4;
	}

	.viz {
		position: relative;
		--chart-height: 100vh;
	}

	.sticky {
		position: sticky;
		top: 0;
		height: var(--chart-height);
		margin: 0 2rem;
		background: white;
	}

	.section {
		height: var(--chart-height);
		color: white;
		background: rebeccapurple;
		padding: 1rem;
		border: 1px solid white;
	}

	.story {
		padding: 1rem;
		font-size: 1rem;
	}
</style>
