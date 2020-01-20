let time = 0
let data = [0,1,2,3];

d3.csv('tornadoPressureData1.CSV').then(function(d) {
    
})

/* I edited out this function It works with the callback function
set in the .on method but i don't know what is going on enough to change it*/
function slideTime(value) {
    time = d3.format('.3')(value) //This number does idk, is '.3' in original
    d3.select("p#time-display")
        .text(`The time is ${time}`)
}

/*We want the step to be 2496 because that's the increment for the time data
*/

/*calls sliderBottom function from some other d3 library (see html header)
sets min max based on data
formats ticks - I don't know what's going on I changed values and didn't get it
on method will update display to show where the slider is but it's continuous
I think we'll need to update it so it is discrete so it will only choose points where we have data
I don't know how to do that.
*/
var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.3')) //This number does idk, is '.3' in original
    .ticks(5) //This number changes the number of ticks but the number does not equal the number of ticks???, is 5 in original
    .default(0) //This number changes what number the selector starts at, is 0 in original
    .on('onchange', val => {
        time = d3.format('.2')(val) //This number in the format function changes the number of decimal places, is '.2' in original
        d3.select('p#time-display').text(`The time is ${time}`);
      });

/* I don't know what this does yet it might generate the svg to stick slider on???*/
var gSimple = d3
    .select('div#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

//Call svg creation based on sliderSimple function???//
gSimple.call(sliderSimple);

//I don't know what this is doing either//
d3.select('p#time-display').text(d3.format('.3')(sliderSimple.value())); //This number does idk, is '.3' in original

let margin = 5

d3.select('body')
    .append('svg')
    .attr('id', 'pressure-display')
    .attr('width', 600)
    .attr('height', 400)
    .append('rect')
    .attr('id', 'top')
    .attr('x', 231.5 + margin)
    .attr('y', 0 + margin)
    .attr('height', 137)
    .attr('height', 43)
    .attr('fill', 'transparent')




/*left/right: 40x91
bottom/top: 137x43
Middle: 137x91
(WxH)*/