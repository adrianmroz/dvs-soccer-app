<script>
	import { fade } from 'svelte/transition';
	import calculateLabels from '$lib/chart-2/calculate-labels.js';
	import { elasticOut } from 'svelte/easing';

	function scaleR(node, { duration = 400, delay = 0 }) {
		const style = getComputedStyle(node);
		const targetRadius = parseFloat(style.r) || 0;
		return {
			duration,
			delay,
			easing: elasticOut,
			css: (t) => `
				opacity: ${t};
				r: ${Math.max(0, t * targetRadius)}px;
			`
		};
	}

	export let data = [];
	export let xScale;
	export let yScale;

	const x_label_shift = -5;
	const y_label_shift = 15;

	$: rawLabels = calculateLabels(data, xScale, yScale);
</script>

{#each data as d}
	<circle
		transition:scaleR|global
		cx={xScale(d.age_21_22)}
		cy={yScale(d['Minutes Played'])}
		r="2.5"
		fill="red"
	/>
{/each}

{#each rawLabels.labels as label}
	<text
		transition:fade|global
		class="name-labels"
		x={label.x + x_label_shift}
		y={label.y - y_label_shift}
		text-anchor="middle"
		font-family="sans-serif"
		font-size="14"
		pointer-events="none"
	>
		{label.label}
	</text>
{/each}

{#each rawLabels.labels_filter as label}
	<line
		transition:fade|global
		class="line-labels"
		x1={xScale(label.dataX)}
		y1={yScale(label.dataY)}
		x2={label.x + x_label_shift}
		y2={label.y - y_label_shift}
		stroke="#aaa"
		stroke-dasharray="2,2"
	/>
{/each}
