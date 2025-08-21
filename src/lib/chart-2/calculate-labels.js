import * as d3 from 'd3';

export default function calculateLabels(data, xScale, yScale) {
	const [x1, x2] = xScale.range();
	const w = x2 - x1;
	const [y1, y2] = yScale.range();
	const h = y1 - y2;

	console.log('DBG', w, h);

	// label link min distance condition
	const min_distance = 0;

	const labels = data.map((d) => ({
		x: d.age_21_22,
		y: d['Minutes Played'],
		fx: null,
		fy: null,
		label: d.Name,
		dataX: d.age_21_22,
		dataY: d['Minutes Played']
	}));

	// Force simulation for labels
	const simulation = d3
		.forceSimulation(labels)
		.force('x', d3.forceX((d) => xScale(d.dataX)).strength(3))
		.force('y', d3.forceY((d) => yScale(d.dataY)).strength(3))
		.force('collide', d3.forceCollide(25)) // Adjust radius for label size
		.stop();

	// Run the simulation for a fixed number of iterations
	for (let i = 0; i < 120; ++i) simulation.tick();

	// Calculate distances and filter
	const labels_filter = labels.filter((d) => {
		const dx = d.x - xScale(d.dataX);
		const dy = d.y - yScale(d.dataY);
		return Math.sqrt(dx * dx + dy * dy) > min_distance;
	});

	// Clamp label positions to stay within the SVG boundaries
	return {
		data,
		labels: labels.map((d) => ({
			...d,
			x: Math.max(0, Math.min(w, d.x)),
			y: Math.max(30, Math.min(h - 2, d.y))
		})),
		labels_filter: labels_filter.map((d) => ({
			...d,
			x: Math.max(0, Math.min(w, d.x)),
			y: Math.max(30, Math.min(h - 2, d.y))
		}))
	};
}
