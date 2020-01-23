d3.select('svg#pressure-display')
    .append('g')
    .attr('id', 'legend')
    .append("defs")
    .append("linearGradient")
    .attr("id", "linear-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")

d3.select('#linear-gradient')
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", '#6948b8')

d3.select('#linear-gradient')
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", '#ff863b')

d3.select('g#legend')
    .append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr("width", 20)
    .attr("height", 2 * bottomTopHeight + centerHeight)
    .style("fill", "url(#linear-gradient)")

let legendScale =
    d3.scaleLinear()
    .domain([-246.4994, 2.146041])    // data
    .range([0, 2 * bottomTopHeight + centerHeight])      // SVG positions
let legendAxis = d3.axisRight(legendScale)

d3.select('g#legend')
    .attr('transform', `translate(${dispWidth - 60 - margin}, ${margin})`)
    .append('g')
    .attr('id', 'axis')
    .call(legendAxis)
    .attr('transform', 'translate(30, 0)')