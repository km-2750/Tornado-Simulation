let time = 0
let data = [0,1,2,3];

/*updates in my file
1) reading in the data 
2) creating a draw function to base the html on the data set

Notes: update html to include paragraph index
Update csv to name columns

*/
d3.csv('tornadoPressureData1.CSV').then(function(d) {
    draw(d)
})

function draw(data){
    let timeData = []
    for (i in data) {
        let timeValue = Number((data[i].Time))
        timeData.push(timeValue)
    }

    let sensor1Data = []
    for (i in data) {
        let sensor1Value = Number((data[i].Sensor1))
        sensor1Data.push(sensor1Value)
    }
    drawSlider(timeData,sensor1Data)
}

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

function drawColor(colorData, index){
    var pressureColorScale = d3.scaleSequential()
      .domain(d3.extent(data))
     .interpolator(d3.interpolateRainbow)
    d3.select('svg#pressure-display')
        .append('circle')
        .attr('id', "sensor1")
        .attr('cx', 150)
        .attr('cy', 150)
        .attr('r', 40)
        .attr("fill", pressureColorScale(colorData[index]))
        .attr("stroke","transparent")
}
function drawSlider(timeData,colorData) {

    var sliderSimple = d3
        .sliderBottom()
        .min(d3.min(timeData))
        .max(d3.max(timeData))
        .step(2496) //update to change step
        .fill('#2196f3')
        .width(300)
        .tickFormat(d3.format('.3')) //This number does idk, is '.3' in original
        .ticks(5) //This number changes the number of ticks but the number does not equal the number of ticks???, is 5 in original
        .default(0) //This number changes what number the selector starts at, is 0 in original
        .on('onchange', val => {
            //time = d3.format('.2')(val) //This number in the format function changes the number of decimal places, is '.2' in original
            let timeIndex = timeData.indexOf(val)
            d3.select('p#time-display').text(`The time is ${val}`); //skiped format to work with only raw time value
            d3.select('p#index-display').text(`The index is ${timeIndex}`);
            drawColor(colorData,timeIndex)

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
}




/*left/right: 40x91
bottom/top: 137x43
Middle: 137x91
(WxH)*/