<script>
	export let data = [];

	$: labels = [
		`Total minutes: 5040`,
		`Number of players: ${data.length}`,
		`Average age: ${Math.round((data.reduce((acc, val) => acc + val.age_21_22, 0) / data.length) * 10) / 10}`,
		`Average stay at club: ${Math.round((data.reduce((acc, val) => acc + (val.age_21_22 - val.age_joined), 0) / data.length) * 10) / 10}`
	];
</script>

<text text-anchor="middle">
	{#each labels as label, i}
		<tspan x={0} y={i * 12}>{label}</tspan>
	{/each}
</text>

<style>
	tspan {
		font-size: 9px;
		font-family: 'Roboto Condensed', Arial, sans-serif;
	}
</style>
