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

/*top/bottom/x (L2R): 6-16-16-30.5-30.5-16-16-6
left/right/x (OFC): 7-15-14-4
top/bottom/y (OFC): 5-15-14-6
center/y (T2B): 6-9.5-9.5-20.5-20.5-9.5-9.5-6*/

/*center is 1-49 (by row, top to bottom, left to right)
top is 50-70 (by row, bottom to top, left to right)
bottom is 71-91 (by row, top to bottom, left to right)
left is 92-106 (by column, top to bottom, right to left)
right is 107-121 (by column, top to bottom, left to right)*/