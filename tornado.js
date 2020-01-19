let time = 0
let data = [0,1,2,3];

function slideTime() {
    time = d3.format('.3')(sliderSimple.value())
    d3.select("p#time-display")
        .text(`The time is ${time}`)
}

var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.3'))
    .ticks(5)
    .default(0)
    .on('onchange', val => {
        time = d3.format('.2')(val)
        d3.select('p#time-display').text(`The time is ${time}`);
      });

var gSimple = d3
    .select('div#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('p#time-display').text(d3.format('.3')(sliderSimple.value()));