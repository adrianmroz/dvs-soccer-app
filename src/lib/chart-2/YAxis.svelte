<script>
	import * as d3 from 'd3';

	export let scale;
	export let height;
	export let width;

	let g;

	$: {
		if (g) {
			const axis = d3.axisLeft(scale);

			const group = d3.select(g);

			group
				.selectAll('.y.axis-label')
				.data([1])
				.join('text')
				.attr('class', 'y axis-label')
				.attr('text-anchor', 'middle')
				.attr('transform', 'rotate(-90)')
				.attr('y', -40)
				.attr('x', -(height / 2))
				.text('Minutes Played (%)');

			group
				.selectAll('.y-axis')
				.data([1])
				.join('g')
				.attr('class', 'y-axis')
				.call(axis.tickSizeOuter(0));

			group
				.selectAll('.y-grid')
				.data([1])
				.join('g')
				.attr('class', 'y-grid')
				.call(axis.tickSize(-width).ticks(5).tickFormat(''));
		}
	}
</script>

<g class="y-axis" bind:this={g}></g>

<style>
	.y-axis :global(.tick) {
		color: #676767;
	}

	.y-axis :global(.y-grid .tick line) {
		stroke: #e0e0e0;
		stroke-width: 1;
		shape-rendering: crispEdges;
		opacity: 55%;
	}

	.y-axis :global(.axis-label) {
		font-size: 14px;
		font-family: 'Roboto Condensed', Arial, sans-serif;
	}
</style>
