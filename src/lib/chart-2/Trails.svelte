<script>
	export let data = [];
	export let xScale;
	export let yScale;
</script>

<defs>
	{#each data as d, i}
		<linearGradient
			id={`chart-2-tail-gradient-${i}`}
			gradientUnits="userSpaceOnUse"
			x1={xScale(d.age_21_22)}
			y1={yScale(d['Minutes Played'])}
			x2={xScale(d.age_joined)}
			y2={yScale(d['Minutes Played'])}
		>
			<stop offset="0%" stop-color="red" stop-opacity="1" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</linearGradient>
	{/each}
</defs>

{#each data as d, i}
	<line
		class="player-tail"
		x1={xScale(d.age_21_22)}
		x2={xScale(d.age_joined)}
		y1={yScale(d['Minutes Played'])}
		y2={yScale(d['Minutes Played']) + 0.1}
		stroke={`url(#chart-2-tail-gradient-${i})`}
		stroke-width={1.2}
	/>
{/each}
