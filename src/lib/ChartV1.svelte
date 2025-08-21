<script>
	import { createViz } from '$lib/chart.js';
	export let step = 1;
	export let data = [];

	let svgElement;

	$: createViz(svgElement, data, step);
</script>

<svg bind:this={svgElement} class="chart"></svg>

<style>
	svg {
		background: #fff;
		display: block;
		margin: 0 auto 1.5em;
	}

	.chart :global(.x-grid .tick line),
	.chart :global(.y-grid .tick line) {
		stroke: #e0e0e0;
		stroke-width: 1;
		shape-rendering: crispEdges;
		opacity: 55%;
	}

	.chart :global(.axis-label) {
		font-size: 14px;
	}

	.chart :global(.name-labels) {
		font-size: 12px;
	}

	.chart {
		font-family: 'Roboto Condensed', Arial, sans-serif;
	}

	.chart :global(.axis-label) {
		color: black;
	}

	.chart :global(.tick) {
		color: #676767;
	}

	.chart :global(.plot-title) {
		font-weight: bold;
	}
</style>
