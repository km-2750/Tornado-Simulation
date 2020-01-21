let circleData = []
d3.csv('pressureTapInfo.csv').then(d => circleData = d)

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

let centerTopBottomX = margin + leftRightWidth
let centerLeftRightY = margin + bottomTopHeight
let bottomY = margin + bottomTopHeight + centerHeight
let topY = margin
let leftX = margin
let rightX = margin + leftRightWidth + bottomTopWidth

d3.select('div.content')
    .append('svg')
    .attr('id', 'pressure-display')
    .attr('width', dispWidth)
    .attr('height', dispHeight)
    .append('rect')
    .attr('id', 'top')
    .attr('x', centerTopBottomX)
    .attr('y', topY)
    .attr('width', bottomTopWidth)
    .attr('height', bottomTopHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'center')
    .attr('x', centerTopBottomX)
    .attr('y', centerLeftRightY)
    .attr('width', centerWidth)
    .attr('height', centerHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'bottom')
    .attr('x', centerTopBottomX)
    .attr('y', bottomY)
    .attr('width', bottomTopWidth)
    .attr('height', bottomTopHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'left')
    .attr('x', leftX)
    .attr('y', centerLeftRightY)
    .attr('width', leftRightWidth)
    .attr('height', leftRightHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'right')
    .attr('x', rightX) 
    .attr('y', centerLeftRightY)
    .attr('width', leftRightWidth)
    .attr('height', leftRightHeight)
    .attr('fill', fill)
    .attr('stroke', 'black')

let centerTransformation = `translate(${centerTopBottomX}, ${centerLeftRightY})`
let topTransformation = `translate(${centerTopBottomX}, ${topY})`
let bottomTransformation = `translate(${centerTopBottomX}, ${bottomY})`
let leftTransformation = `translate(${leftX}, ${centerLeftRightY})`
let rightTransformation = `translate(${rightX}, ${centerLeftRightY})`

d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'center-circles')
    .attr('transform', centerTransformation)
d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'top-circles')
    .attr('transform', topTransformation)
d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'bottom-circles')
    .attr('transform', bottomTransformation)
d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'left-circles')
    .attr('transform', leftTransformation)
d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'right-circles')
    .attr('transform', rightTransformation)

groupList = ['top', 'center', 'bottom', 'left', 'right']

for (let groupName of groupList) {
    d3.select('g#' + groupName + '-circles')
        .selectAll('circle')
        .data(circleData.filter(d => (d.group === groupName)))
        .enter()
        .append('circle')
        .attr('cx', d => scale * Number(d.cx))
        .attr('cy', d => scale * Number(d.cy))
        .attr('r', 5)
        .attr('fill', 'blue')
}