let margin = 5
let scale = 4

//Constants DO NOT CHANGE
const leftRightX = 40 * scale
const leftRightY = 91 * scale
const bottomTopX = 137 * scale
const bottomTopY = 43 * scale
const centerX = 137 * scale
const centerY = 91 * scale
const dispWidth = (2 * margin) + ((2 * leftRightX) + centerX)
const dispHeight = (2 * margin) + ((2 * bottomTopY) + (centerY))

/*left/right: 40x91
bottom/top: 137x43
Middle: 137x91
(WxH)*/

d3.select('div.content')
    .append('svg')
    .attr('id', 'pressure-display')
    .attr('width', dispWidth)
    .attr('height', dispHeight)
    .append('rect')
    .attr('id', 'top')
    .attr('x', margin + leftRightX)
    .attr('y', margin)
    .attr('width', bottomTopX)
    .attr('height', bottomTopY)
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'center')
    .attr('x', margin + leftRightX)
    .attr('y', margin + bottomTopY)
    .attr('width', centerX)
    .attr('height', centerY)
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'bottom')
    .attr('x', margin + leftRightX)
    .attr('y', margin + bottomTopY + centerY)
    .attr('width', bottomTopX)
    .attr('height', bottomTopY)
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'left')
    .attr('x', margin)
    .attr('y', margin + bottomTopY)
    .attr('width', leftRightX)
    .attr('height', leftRightY)
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'right')
    .attr('x', margin + leftRightX + bottomTopX) 
    .attr('y', margin + bottomTopY)
    .attr('width', leftRightX)
    .attr('height', leftRightY)
    .attr('fill', 'transparent')
    .attr('stroke', 'black')