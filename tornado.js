let time = 0
let data = [0,1,2,3];

function slideTime() {
    d3.select("p#time-display")
        .text(`The time is ${time}`)
}

var sliderSimple = d3.select("body")
    .select("div#slider")
    .append("input")
    .attr("type", "range")
    .attr("id", "time-slider")
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default(0.015)
    .on('onchange', slideTime(value));

var gSimple = d3
    .select('div#time-slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('p#time-value').text(d3.format('.2%')(sliderSimple.value()));