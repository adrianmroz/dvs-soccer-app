<script>
	import { fade } from 'svelte/transition';
	import * as d3 from 'd3';

	export let scale;
	export let width;
	export let height;

	let g;

	$: {
		if (g) {
			const axis = d3.axisBottom(scale);

			const group = d3.select(g);

			group
				.selectAll('.x-axis')
				.data([1])
				.join('g')
				.attr('class', 'x-axis')
				.call(axis.tickSizeOuter(0)); // to remove the tick which by default appears at min and max values

			group
				.selectAll('.x.axis-label')
				.data([1])
				.join('text')
				.attr('class', 'x axis-label')
				.attr('text-anchor', 'middle')
				.attr('x', width / 2)
				.attr('y', 30)
				.text('Player Age');

			// Gridlines (essentially the duplicated axes again, but with ticks converted to gridlines and with removed axis labels and breaks)
			group
				.selectAll('.x-grid')
				.data([1])
				.join('g')
				.attr('class', 'x-grid')
				.call(axis.tickSize(-height).ticks(7).tickFormat(''));
		}
	}
</script>

<g class="x-axis" transition:fade bind:this={g}></g>

<style>
	.x-axis :global(.tick) {
		color: #676767;
	}

	.x-axis :global(.x-grid .tick line) {
		stroke: #e0e0e0;
		stroke-width: 1;
		shape-rendering: crispEdges;
		opacity: 55%;
	}

	.x-axis :global(.axis-label) {
		font-size: 14px;
		font-family: 'Roboto Condensed', Arial, sans-serif;
	}
</style>
