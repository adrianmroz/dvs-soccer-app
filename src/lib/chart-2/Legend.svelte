<script>
	import { fade } from 'svelte/transition';

	const explanatory_tails = [
		{
			x1: 0,
			x2: 50,
			y: 15,
			label1: 'Age at joining',
			label2: 'Current age'
		}
	];

	const explanatory_labels = [
		{
			x: 3,
			y: 30,
			label: 'Age at joining',
			x_point: 0,
			y_point: 15
		},
		{
			x: 37,
			y: 0,
			label: 'Current age',
			x_point: 50,
			y_point: 15
		}
	];
</script>

<defs>
	<marker
		id="chart-2-arrow"
		markerWidth="4"
		markerHeight="4"
		refX="4"
		refY="2"
		orient="auto"
		markerUnits="strokeWidth"
	>
		<path d="M0,0 L4,2 L0,4 Z" fill="black" />
	</marker>

	{#each explanatory_tails as tail, i}
		<linearGradient
			id={`chart-2-explanatory-gradient-${i}`}
			x1={tail.x2}
			y1={tail.y}
			x2={tail.x1}
			y2={tail.y}
			spreadMethod="pad"
			gradientUnits="userSpaceOnUse"
		>
			<stop offset="0%" stop-color="red" stop-opacity="1" />
			<stop offset="100%" stop-color="red" stop-opacity="0" />
		</linearGradient>
	{/each}
</defs>

<g transition:fade>
	{#each explanatory_tails as tail, i}
		<line
			class="explanatory-tail"
			x1={tail.x2}
			y1={tail.y}
			x2={tail.x1}
			y2={tail.y}
			stroke={`url(#chart-2-explanatory-gradient-${i})`}
			stroke-width={1.2}
		/>
	{/each}

	{#each explanatory_labels as label, i}
		<text
			class="explanatory-label"
			x={label.x}
			y={label.y}
			text-anchor="middle"
			font-size={8.5}
		>
			{label.label}
		</text>
		<line
			class="explanatory-line"
			x1={label.x + 2}
			y1={label.y - 8 + i * 10}
			x2={label.x_point}
			y2={label.y_point}
			stroke="gray"
			stroke-width={0.9}
			marker-end="url(#chart-2-arrow)"
		>
		</line>
	{/each}
</g>
