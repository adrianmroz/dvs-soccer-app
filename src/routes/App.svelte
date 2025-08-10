<script>
	import { fade } from 'svelte/transition';
	import { createViz } from './chart.js';
	import data from './data.json';

	let svgElement;
	let step = 1;
	const maxStep = 6;

	const stories = [
		'Real Madrid is the most successful club in the 21st century and this is largely due to its squad profile.',
		'Player age is certainly one of the key parameters.',
		"But it can only be intepreted correctly by knowing that players' playing time contribution.",
		"It is clear now that Real Madrid uses a combination of experienced and younger players, but the team's backbone are more experienced players",
		"But this still doesn't paint the complete picture as this team has also displayed great response to pressure, especially in the Champions League, and this is probably due to the fact that the team's most used players have played many seasons together.",
		"Which is also visible from a very high mean players' stay at the club."
	];

	function nextStep() {
		step = Math.min(step + 1, maxStep);
	}

	function prevStep() {
		step = Math.max(step - 1, 1);
	}

	$: createViz(svgElement, data, step);
</script>

<div class="container">
	<svg bind:this={svgElement} class="chart"></svg>
	{#key step}
		<p in:fade={{ duration: 300 }}>
			{stories[step - 1]}
		</p>
	{/key}
	<button on:click={prevStep} disabled={step === 1}>Previous</button>
	<button on:click={nextStep} disabled={step === maxStep}>Next</button>
</div>

<style>
	.container {
		max-width: 750px;
		margin: auto;
		padding: 2em;
		background: #fff;
		position: relative;
	}

	svg {
		background: #fff;
		display: block;
		margin: 0 auto 1.5em;
	}

	button {
		margin: 0 12px;
		padding: 0.6em 1.4em;
		font-size: 1em;
		border-radius: 5px;
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
