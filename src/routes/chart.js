import * as d3 from 'd3';

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

function fadeInFadeOutGroup() {
	return [
		(enter) =>
			enter
				.append('g')
				.style('opacity', 0)
				.transition()
				.duration(300)
				.style('opacity', 1),
		(update) => update,
		(exit) =>
			exit
				.style('opacity', 1)
				.transition()
				.duration(300)
				.style('opacity', 0)
				.remove()
	];
}

function summary(node) {
	// Add explanation mini chart
	// Make other tails gray when hovering over some tail and the one hovering over keep red

	const summaryTextNode = node
		.selectAll('.summary-text')
		.data((data) =>
			data.length
				? [
						[
							`Total minutes: 5040`,
							`Number of players: ${data.length}`,
							`Average age: ${Math.round((data.reduce((acc, val) => acc + val.age_21_22, 0) / data.length) * 10) / 10}`,
							`Average stay at club: ${Math.round((data.reduce((acc, val) => acc + (val.age_21_22 - val.age_joined), 0) / data.length) * 10) / 10}`
						]
					]
				: []
		)
		.join('text')
		.classed('summary-text', true)
		.attr('text-anchor', 'middle');
	//.attr("x", w - pl - pr + logo_width/2 + 20)
	//.attr("y", pt + 30)

	summaryTextNode
		.selectAll('tspan')
		.data((d) => d)
		.join('tspan')
		.attr('x', w - pr + logo_width / 2 + 20)
		.attr('y', (d, i) => 180 + i * 12)
		.style('font-size', 9)
		.text((d) => d);
}

function legend(node, show) {
	const legendData = {
		explanatory_tails: [
			{
				x1: w - pr + 45,
				x2: w - pr + 95,
				y: 310,
				label1: 'Age at joining',
				label2: 'Current age'
			}
		],

		explanatory_labels: [
			{
				x: w - pr + 48,
				y: 325,
				label: 'Age at joining',
				x_point: w - pr + 45,
				y_point: 310
			},
			{
				x: w - pr + 20 + 62,
				y: 295,
				label: 'Current age',
				x_point: w - pr + 95,
				y_point: 310
			}
		]
	};

	const defs = node.select('defs');

	const gradients = defs
		.selectAll('.explanatory-gradient')
		.data(legendData.explanatory_tails)
		.join('linearGradient')
		.classed('explanatory-gradient', true)
		.attr('id', (d, i) => `explanatory-gradient-${i}`)
		.attr('gradientUnits', 'userSpaceOnUse')
		.attr('x1', (d) => d.x2)
		.attr('y1', (d) => d.y)
		.attr('x2', (d) => d.x1)
		.attr('y2', (d) => d.y);

	gradients
		.selectAll('stop')
		.data([
			{ offset: 0, opacity: 1 },
			{ offset: 100, opacity: 0 }
		])
		.join('stop')
		.attr('offset', (d) => `${d.offset}%`)
		.attr('stop-color', 'red')
		.attr('stop-opacity', (d) => d.opacity);

	const markers = defs
		.selectAll('.explanatory-marker')
		.data(legendData.explanatory_tails)
		.join('marker')
		.classed('explanatory-marker', true)
		.attr('id', 'arrow')
		.attr('markerWidth', 4) // if scaling the markerwidth and height, correspondign ratio change should also be applied to to refX and Y and d path attr
		.attr('markerHeight', 4)
		.attr('refX', 4)
		.attr('refY', 2)
		.attr('orient', 'auto')
		.attr('markerUnits', 'strokeWidth')
		.append('path')
		.attr('d', 'M0,0 L4,2 L0,4 Z')
		.attr('fill', 'black');

	const g = node
		.selectAll('.summary-container')
		.data(show ? [legendData] : [])
		.join(...fadeInFadeOutGroup())
		.classed('summary-container', true);

	g.selectAll('.explanatory-tail')
		.data((d) => d.explanatory_tails)
		.join('line')
		.classed('explanatory-tail', true)
		.attr('x1', (d) => d.x2)
		.attr('y1', (d) => d.y)
		.attr('x2', (d) => d.x1)
		.attr('y2', (d) => d.y)
		.attr('stroke', (d, i) => `url(#explanatory-gradient-${i})`)
		.attr('stroke-width', 1.2);

	g.selectAll('.explanatory_text')
		.data((d) => d.explanatory_labels)
		.join('text')
		.classed('explanatory_text', true)
		.attr('x', (d) => d.x)
		.attr('y', (d) => d.y)
		.attr('text-anchor', 'middle')
		.attr('font-size', 8.5)
		.text((d) => d.label);

	g.selectAll('.explanatory_labels') // added .labels to separate connecting lines from lines to apply gradient to
		.data((d) => d.explanatory_labels)
		.join('line')
		.classed('explanatory_labels', true)
		.attr('x1', (d, i) => d.x + 2) // label x coordinate
		.attr('y1', (d, i) => d.y - 8 + i * 10) //offset jednoggore jednog dolje
		.attr('x2', (d) => d.x_point) // point x coordinate
		.attr('y2', (d) => d.y_point)
		.attr('stroke', 'gray')
		.attr('stroke-width', 0.9)
		.attr('marker-end', 'url(#arrow)');
}

function xAxis(node, scale) {
	const axis = d3.axisBottom(scale);

	node
		.selectAll('.x-axis')
		.data((d) => [d])
		.join('g')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + (h - pb) + ')')
		.call(axis.tickSizeOuter(0)); // to remove the tick which by default appears at min and max values

	node
		.selectAll('.x.axis-label')
		.data((d) => [d])
		.join('text')
		.attr('class', 'x axis-label')
		.attr('text-anchor', 'middle')
		.attr('x', pl + (w - pl - pr) / 2)
		.attr('y', h - pb / 2 + 10)
		.text('Player Age');

	// Gridlines (essentially the duplicated axes again, but with ticks converted to gridlines and with removed axis labels and breaks)
	node
		.selectAll('.x-grid')
		.data((d) => [d])
		.join('g')
		.attr('class', 'x-grid')
		.attr('transform', 'translate(0,' + (h - pb) + ')')
		.call(
			axis
				.tickSize(-(h - pt - pb))
				.ticks(7)
				.tickFormat('')
		);
}

function yAxis(node, scale) {
	const axis = d3.axisLeft(scale);

	node
		.selectAll('.y.axis-label')
		.data((d) => [d])
		.join('text')
		.attr('class', 'y axis-label')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.attr('y', pl / 2 - 7)
		.attr('x', -(pt + (h - pb - pt) / 2))
		.text('Minutes Played (%)');

	node
		.selectAll('.y-axis')
		.data((d) => [d])
		.join('g')
		.attr('class', 'y-axis')
		.attr('transform', 'translate(' + pl + ', 0)')
		.call(axis.tickSizeOuter(0));

	node
		.selectAll('.y-grid')
		.data((d) => [d])
		.join('g')
		.attr('class', 'y-grid')
		.attr('transform', 'translate(' + pl + ', 0)')
		.call(
			axis
				.tickSize(-(w - pl - pr))
				.ticks(5)
				.tickFormat('')
		);
}

function title(node) {
	// plot title
	const titleContainer = node
		.selectAll('.plot-title')
		.data([1])
		.join('text')
		.attr('class', 'plot-title')
		.attr('text-anchor', 'left')
		.attr('x', pl)
		.attr('y', pt / 2)
		.attr('font-size', 17)
		.attr('font-weight', 'bold');

	titleContainer
		.selectAll('.first')
		.data([1])
		.join('tspan')
		.attr('class', 'first')
		.text('Real Madrid C.F. ')
		.style('fill', 'darkblue')
		.style('font-weight', 'bold');

	titleContainer
		.selectAll('.second')
		.data([1])
		.join('tspan')
		.attr('class', 'second')
		.text('squad age profile')
		.style('fill', 'black')
		.style('font-weight', 'bold');

	// plot subtitle
	node
		.selectAll('.subtitle')
		.data([1])
		.join('text')
		.attr('class', 'title, subtitle')
		.attr('text-anchor', 'left')
		.attr('x', pl)
		.attr('y', pt / 2 + 20)
		.text('End of season 2021/2022')
		.attr('font-size', 15)
		.attr('font-weight', 'normal');
}

function logo(node) {
	node
		.selectAll('image')
		.data([1])
		.join('image')
		.attr('x', w - pl - pr + logo_width / 2 + 20) // 20px padding from chart
		.attr('y', pt)
		.attr('width', logo_width)
		.attr('href', './real_logo.svg');
}

function linearGradients(defs, data, xScale, yScale) {
	const linearGradients = defs
		.selectAll('.tail-gradient')
		.data(data)
		.join('linearGradient')
		.classed('tail-gradient', true)
		.attr('id', (d, i) => `tail-gradient-${i}`)
		.attr('gradientUnits', 'userSpaceOnUse')
		.attr('x1', (d) => xScale(d.age_21_22))
		.attr('y1', (d) => yScale(d['Minutes Played']))
		.attr('x2', (d) => xScale(d.age_joined))
		.attr('y2', (d) => yScale(d['Minutes Played']));

	linearGradients
		.selectAll('stop')
		.data([
			{ offset: 0, opacity: 1 },
			{ offset: 100, opacity: 0 }
		])
		.join('stop')
		.attr('offset', (d) => `${d.offset}%`)
		.attr('stop-color', 'red')
		.attr('stop-opacity', (d) => d.opacity);
}

function playerPoints(node, xScale, yScale) {
	// x and y coordinate label shift
	const x_label_shift = -5;
	const y_label_shift = 15;

	const pointsGroup = node
		.selectAll('.data-point-group')
		.data((data) => [calculateLabels(data, xScale, yScale)])
		.join('g')
		.attr('class', 'data-point-group');

	const nameLabels = pointsGroup
		.selectAll('.name-labels')
		.data((d) => d.labels)
		.join('text')
		.classed('name-labels', true)
		.attr('x', (d) => d.x + x_label_shift)
		.attr('y', (d) => d.y - y_label_shift)
		.attr('text-anchor', 'middle')
		.text((d) => d.label)
		.style('font-family', 'sans-serif')
		.style('font-size', '14px')
		.style('pointer-events', 'none');

	const lineLabels = pointsGroup
		.selectAll('.line_labels')
		.data((d) => d.labels_filter)
		.join('line')
		.classed('line_labels', true)
		.attr('x1', (d) => xScale(d.dataX)) // point x coordinate
		.attr('y1', (d) => yScale(d.dataY))
		.attr('x2', (d) => d.x + x_label_shift) // label x coordinate
		.attr('y2', (d) => d.y - y_label_shift)
		.attr('stroke', '#aaa')
		.attr('stroke-dasharray', '2,2');

	const points = pointsGroup
		.selectAll('circle')
		.data((d) => d.data)
		.join('circle')
		.attr('cx', (d) => xScale(d.age_21_22))
		.attr('cy', (d) => yScale(d['Minutes Played']))
		.attr('r', 2.5)
		.attr('fill', 'red');
}

function playerLines(node, xScale, yScale) {
	node
		.selectAll('.player-tail')
		.data((data) => data)
		.join('line')
		.classed('player-tail', true)
		.attr('x1', (d) => xScale(d.age_21_22))
		.attr('y1', (d) => yScale(d['Minutes Played']))
		.attr('x2', (d) => xScale(d.age_joined))
		.attr('y2', (d) => yScale(d['Minutes Played'] + 0.1)) // a tiny slope has to be added because blurring completely horizontal lines can cause rendering problems
		.attr('stroke', (d, i) => `url(#tail-gradient-${i})`)
		.attr('stroke-width', 1.2);
}

function calculateLabels(data, xScale, yScale) {
	if (data.length === 0) {
		return { labels: [], labels_filter: [], data: [] };
	}
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
			x: Math.max(pl, Math.min(w - pr, d.x)),
			y: Math.max(pt + 30, Math.min(h - pb - 2, d.y))
		})),
		labels_filter: labels_filter.map((d) => ({
			...d,
			x: Math.max(pl, Math.min(w - pr, d.x)),
			y: Math.max(pt + 30, Math.min(h - pb - 2, d.y))
		}))
	};
}

// let instead of const to be able to filter-modify the existing data
// Adrian: renamed to rawData for clarity
export function createViz(svgElement, rawData, step) {
	const max_minutes = 5040; // 5040 is the Real Madrid's total minutes that season

	if (!svgElement) return;

	// Filter only players with > 1000 minutes played
	const data = rawData
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
	const xScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d.age_joined) - 1,
			d3.max(data, (d) => d.age_21_22) + 1
		])
		.range([pl, w - pr]);

	const yScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d['Minutes Played']) - 3,
			d3.max(data, (d) => d['Minutes Played']) + 7
		])
		.range([h - pb, pt]);

	const svg = d3.select(svgElement).attr('width', w).attr('height', h);

	const defs = svg.selectAll('defs').data([1]).join('defs');
	defs.call(linearGradients, data, xScale, yScale);

	svg.call(title);
	svg.call(logo);

	svg
		.selectAll('.summary')
		.data(step === 6 ? [rawData] : [])
		.join(...fadeInFadeOutGroup())
		.classed('summary', true)
		.call(summary);

	svg.call(legend, step >= 5);

	svg
		.selectAll('.player-lines')
		.data(step >= 5 ? [data] : [])
		.join(...fadeInFadeOutGroup())
		.classed('player-lines', true)
		.call(playerLines, xScale, yScale);

	svg
		.selectAll('.player-points')
		.data(step >= 4 ? [data] : [])
		.join(...fadeInFadeOutGroup())
		.classed('player-points', true)
		.call(playerPoints, xScale, yScale);

	svg
		.selectAll('.x-axis-group')
		.data(step >= 2 ? [1] : [])
		.join(...fadeInFadeOutGroup())
		.classed('x-axis-group', true)
		.call(xAxis, xScale);

	svg
		.selectAll('.y-axis-group')
		.data(step >= 3 ? [1] : [])
		.join(...fadeInFadeOutGroup())
		.classed('y-axis-group', true)
		.call(yAxis, yScale);
}
