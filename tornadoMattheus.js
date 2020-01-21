var circleData = [
    {'cx': 6, 'cy': 6, 'group': 'center'},
    {'cx': 22, 'cy': 6, 'group': 'center'},
    {'cx': 38, 'cy': 6, 'group': 'center'},
    {'cx': 68.5, 'cy': 6, 'group': 'center'},
    {'cx': 99, 'cy': 6, 'group': 'center'},
    {'cx': 115, 'cy': 6, 'group': 'center'},
    {'cx': 131, 'cy': 6, 'group': 'center'},
    {'cx': 6, 'cy': 15.5, 'group': 'center'},
    {'cx': 22, 'cy': 15.5, 'group': 'center'},
    {'cx': 38, 'cy': 15.5, 'group': 'center'},
    {'cx': 68.5, 'cy': 15.5, 'group': 'center'},
    {'cx': 99, 'cy': 15.5, 'group': 'center'},
    {'cx': 115, 'cy': 15.5, 'group': 'center'},
    {'cx': 131, 'cy': 15.5, 'group': 'center'},
    {'cx': 6, 'cy': 25, 'group': 'center'},
    {'cx': 22, 'cy': 25, 'group': 'center'},
    {'cx': 38, 'cy': 25, 'group': 'center'},
    {'cx': 68.5, 'cy': 25, 'group': 'center'},
    {'cx': 99, 'cy': 25, 'group': 'center'},
    {'cx': 115, 'cy': 25, 'group': 'center'},
    {'cx': 131, 'cy': 25, 'group': 'center'},
    {'cx': 6, 'cy': 45.5, 'group': 'center'},
    {'cx': 22, 'cy': 45.5, 'group': 'center'},
    {'cx': 38, 'cy': 45.5, 'group': 'center'},
    {'cx': 68.5, 'cy': 45.5, 'group': 'center'},
    {'cx': 99, 'cy': 45.5, 'group': 'center'},
    {'cx': 115, 'cy': 45.5, 'group': 'center'},
    {'cx': 131, 'cy': 45.5, 'group': 'center'},
    {'cx': 6, 'cy': 66, 'group': 'center'},
    {'cx': 22, 'cy': 66, 'group': 'center'},
    {'cx': 38, 'cy': 66, 'group': 'center'},
    {'cx': 68.5, 'cy': 66, 'group': 'center'},
    {'cx': 99, 'cy': 66, 'group': 'center'},
    {'cx': 115, 'cy': 66, 'group': 'center'},
    {'cx': 131, 'cy': 66, 'group': 'center'},
    {'cx': 6, 'cy': 75.5, 'group': 'center'},
    {'cx': 22, 'cy': 75.5, 'group': 'center'},
    {'cx': 38, 'cy': 75.5, 'group': 'center'},
    {'cx': 68.5, 'cy': 75.5, 'group': 'center'},
    {'cx': 99, 'cy': 75.5, 'group': 'center'},
    {'cx': 115, 'cy': 75.5, 'group': 'center'},
    {'cx': 131, 'cy': 75.5, 'group': 'center'},
    {'cx': 6, 'cy': 85, 'group': 'center'},
    {'cx': 22, 'cy': 85, 'group': 'center'},
    {'cx': 38, 'cy': 85, 'group': 'center'},
    {'cx': 68.5, 'cy': 85, 'group': 'center'},
    {'cx': 99, 'cy': 85, 'group': 'center'},
    {'cx': 115, 'cy': 85, 'group': 'center'},
    {'cx': 131, 'cy': 85, 'group': 'center'}]

let margin = 5
let scale = 4
let fill = 'white'

//Constants DO NOT CHANGE
const leftRightWidth = 40 * scale
const leftRightHeight = 91 * scale
const bottomTopWidth = 137 * scale
const bottomTopHeight = 43 * scale
const centerWidth = 137 * scale
const centerHeight = 91 * scale
const dispWidth = (2 * margin) + ((2 * leftRightWidth) + centerWidth)
const dispHeight = (2 * margin) + ((2 * bottomTopHeight) + (centerHeight))

d3.select('div.content')
    .append('svg')
    .attr('id', 'pressure-display')
    .attr('width', dispWidth)
    .attr('height', dispHeight)
    .append('rect')
    .attr('id', 'top')
    .attr('x', margin + leftRightWidth)
    .attr('y', margin)
    .attr('width', bottomTopWidth)
    .attr('height', bottomTopHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'center')
    .attr('x', margin + leftRightWidth)
    .attr('y', margin + bottomTopHeight)
    .attr('width', centerWidth)
    .attr('height', centerHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'bottom')
    .attr('x', margin + leftRightWidth)
    .attr('y', margin + bottomTopHeight + centerHeight)
    .attr('width', bottomTopWidth)
    .attr('height', bottomTopHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'left')
    .attr('x', margin)
    .attr('y', margin + bottomTopHeight)
    .attr('width', leftRightWidth)
    .attr('height', leftRightHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'right')
    .attr('x', margin + leftRightWidth + bottomTopWidth) 
    .attr('y', margin + bottomTopHeight)
    .attr('width', leftRightWidth)
    .attr('height', leftRightHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')

let centerY = margin + bottomTopHeight
let centerX = margin + leftRightWidth
let centerTransformation = `translate(${centerX}, ${centerY})`

let topY = margin
let topX = margin + leftRightWidth
let topTransformation = `translate(${topX}, ${topY})`

let bottomY = margin + bottomTopHeight + centerHeight
let bottomX = margin + leftRightWidth
let bottomTransformation = `translate(${bottomX}, ${bottomY})`

d3.select('svg#pressure-display') //Center grouping
    .append('g')
    .attr('id', 'center-circles')
    .attr('transform', centerTransformation)

d3.select('svg#pressure-display') //Top grouping
    .append('g')
    .attr('id', 'top-circles')
    .attr('transform', topTransformation)

d3.select('svg#pressure-display') //Bottom grouping
    .append('g')
    .attr('id', 'bottom-circles')
    .attr('transform', bottomTransformation)

var circles = d3.select('g#center-circles')
                .selectAll('circle')
                .data(circleData)
                .enter()
                .append('circle');

var circleAttributes = circles
                        .attr('cx', function (d) { return scale * d.cx; })
                        .attr('cy', function (d) { return scale * d.cy; })
                        .attr('r', 5)
                        .style('fill', 'blue');

/*top/bottom/x (L2R): 6-16-16-30.5-30.5-16-16-6
left/right/x (OFC): 7-15-14-4
top/bottom/y (OFC): 5-15-14-6
center/y (T2B): 6-9.5-9.5-20.5-20.5-9.5-9.5-6*/

/*center is 1-49 (by row, top to bottom, left to right)
top is 50-70 (by row, bottom to top, left to right)
bottom is 71-91 (by row, top to bottom, left to right)
left is 92-106 (by column, top to bottom, right to left)
right is 107-121 (by column, top to bottom, left to right)*/