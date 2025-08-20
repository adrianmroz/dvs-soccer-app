<script>
	import * as d3 from 'd3';
	import Logo from '$lib/chart-2/Logo.svelte';
	import Title from '$lib/chart-2/Title.svelte';
	import Summary from '$lib/chart-2/Summary.svelte';
	import XAxis from '$lib/chart-2/XAxis.svelte';
	import YAxis from '$lib/chart-2/YAxis.svelte';
	import Scatterplot from '$lib/chart-2/Scatterplot.svelte';
	import Legend from '$lib/chart-2/Legend.svelte';
	import Trails from '$lib/chart-2/Trails.svelte';
	export let data = [];
	export let step = 1;

	// svg container dimensions
	const w = 750;
	const h = 500;

	// margins
	const pl = 50;
	const pt = 60;
	const pr = 150;
	const pb = 50;

	// emblem width
	const logo_width = 100; // only set the width, the height auto-scales

	const max_minutes = 5040; // 5040 is the Real Madrid's total minutes that season
	$: transformedData = data
		.filter((d) => {
			return d['Minutes Played'] > 1500;
		})
		.map((d) => {
			const normalizedMinutesPlayed = (100 * d['Minutes Played']) / max_minutes;
			return {
				...d,
				['Minutes Played']: normalizedMinutesPlayed
			};
		});

	// Declare scales
	$: xScale = d3
		.scaleLinear()
		.domain([
			d3.min(transformedData, (d) => d.age_joined) - 1,
			d3.max(transformedData, (d) => d.age_21_22) + 1
		])
		.range([0, w - pr - pl]);

	$: yScale = d3
		.scaleLinear()
		.domain([
			d3.min(transformedData, (d) => d['Minutes Played']) - 3,
			d3.max(transformedData, (d) => d['Minutes Played']) + 7
		])
		.range([h - pb - pt, 0]);
</script>

<svg width={w} height={h}>
	{#if step >= 2}
		<g transform={`translate(${pl}, ${h - pb})`}>
			<XAxis scale={xScale} width={w - pl - pr} height={h - pt - pb} />
		</g>
	{/if}
	{#if step >= 3}
		<g transform={`translate(${pl}, ${pt})`}>
			<YAxis scale={yScale} height={h - pt - pb} width={w - pl - pr} />
		</g>
	{/if}
	{#if step >= 4}
		<g transform={`translate(${pl}, ${pt})`}>
			<Scatterplot data={transformedData} {xScale} {yScale} />
		</g>
	{/if}
	{#if step >= 5}
		<g transform={`translate(${pl}, ${pt})`}>
			<Trails data={transformedData} {xScale} {yScale} />
		</g>
	{/if}
	{#if step >= 5}
		<g transform={`translate(${w - pr + 45}, 295)`}>
			<Legend />
		</g>
	{/if}
	<g transform={`translate(${w - pl - pr + logo_width / 2 + 20}, ${pt})`}>
		<Logo width={logo_width} />
	</g>
	<g transform={`translate(${pl}, ${pt / 2})`}>
		<Title />
	</g>
	{#if step === 6}
		<g transform={`translate(${w - pr + logo_width / 2 + 20}, 180)`}>
			<Summary {data} />
		</g>
	{/if}
</svg>
