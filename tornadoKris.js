d3.csv('tornadoPressureData1.CSV').then(function(d) {
    console.log(d)
    draw(d)
})

function draw(data){
    let timeData = []
    for (i in data) {
        let timeValue = Number((data[i].Time))
        timeData.push(timeValue)
    }

    let  sensorData= [{
        "sensor1": []
    }]
    for (i in data) {
        let sensor1Value = Number((data[i].Sensor1))
        sensorData[0]['sensor1'].push(sensor1Value)
    }
    let ColorDomain = data.map(d => d.Sensor1)
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(ColorDomain))
        .interpolator(d3.interpolateRainbow)

    drawSlider(timeData,sensorData)
    d3.select('svg#pressure-display')
        .selectAll('circle')
        .data(sensorData)
        .enter()
        .append('circle')
        .attr('cx', 150)
        .attr('cy', 150)
        .attr('r', 20)
        .attr("fill", (d,i) => pressureColorScale(sensorData[i].sensor1[0])) 
        .attr("stroke","transparent")
}
function drawColor(colorData, index){
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(colorData[0]['sensor1']))
        .interpolator(d3.interpolateRainbow)
        console.log(d3.extent(colorData[0]['sensor1']))
    d3.select('svg#pressure-display')
        .selectAll('circle')
        .attr("fill", pressureColorScale(colorData[0]['sensor1'][index]))
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

let margin = 5
let scale = 4
let fill = 'white'

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
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'center')
    .attr('x', margin + leftRightX)
    .attr('y', margin + bottomTopY)
    .attr('width', centerX)
    .attr('height', centerY)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'bottom')
    .attr('x', margin + leftRightX)
    .attr('y', margin + bottomTopY + centerY)
    .attr('width', bottomTopX)
    .attr('height', bottomTopY)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'left')
    .attr('x', margin)
    .attr('y', margin + bottomTopY)
    .attr('width', leftRightX)
    .attr('height', leftRightY)
    .attr('fill', fill)
    .attr('stroke', 'black')
d3.select('svg#pressure-display')
    .append('rect')
    .attr('id', 'right')
    .attr('x', margin + leftRightX + bottomTopX) 
    .attr('y', margin + bottomTopY)
    .attr('width', leftRightX)
    .attr('height', leftRightY)
    .attr('fill', fill)
    .attr('stroke', 'black')

function drawCenterCircles() {
    d3.select('svg#pressure-display')
        for (i=1; i<=49; i++) {
            
        }
}

/*top/bottom/x (L2R): 6-16-16-30.5-30.5-16-16-6
left/right/x (OFC): 7-15-14-4
top/bottom/y (OFC): 5-15-14-6
center/y (T2B): 6-9.5-9.5-20.5-20.5-9.5-9.5-6*/

/*center is 1-49 (by row, top to bottom, left to right)
top is 50-70 (by row, bottom to top, left to right)
bottom is 71-91 (by row, top to bottom, left to right)
left is 92-106 (by column, top to bottom, right to left)
right is 107-121 (by column, top to bottom, left to right)*/