let trialData = []
d3.csv('tornadoPressureData1.CSV').then(d => trialData = d) //Load in data to trial data array

function getTimeData(data){
    let timeData = []
    for (i in data) {
        let timeValue = Number((data[i].Time))
        timeData.push(timeValue)
    }
    return timeData
}
function getSensorData(data){
    sensorNames =['Sensor1','Sensor2','Sensor3','Sensor4','Sensor5',
        'Sensor6','Sensor7','Sensor8','Sensor9','Sensor10','Sensor11',
        'Sensor12','Sensor13','Sensor14','Sensor15','Sensor16','Sensor17',
        'Sensor18','Sensor19','Sensor20','Sensor21','Sensor22','Sensor23',
        'Sensor24','Sensor25','Sensor26','Sensor27','Sensor28','Sensor29',
        'Sensor30','Sensor31','Sensor32','Sensor33','Sensor34','Sensor35',
        'Sensor36','Sensor37','Sensor38','Sensor39','Sensor40','Sensor41',
        'Sensor42','Sensor43','Sensor44','Sensor45','Sensor46','Sensor47',
        'Sensor48','Sensor49','Sensor50','Sensor51','Sensor52','Sensor53',
        'Sensor54','Sensor55','Sensor56','Sensor57','Sensor58','Sensor59',
        'Sensor60','Sensor61','Sensor62','Sensor63','Sensor64','Sensor65',
        'Sensor66','Sensor67','Sensor68','Sensor69','Sensor70','Sensor71',
        'Sensor72','Sensor73','Sensor74','Sensor75','Sensor76','Sensor77',
        'Sensor78','Sensor79','Sensor80','Sensor81','Sensor82','Sensor83',
        'Sensor84','Sensor85','Sensor86','Sensor87','Sensor88','Sensor89',
        Sensor90,Sensor91,Sensor92,Sensor93,Sensor94,Sensor95,
        Sensor96,Sensor97,Sensor98,Sensor99,Sensor100,Sensor101,
        Sensor102,Sensor103,Sensor104,Sensor105,Sensor106,Sensor107,
        Sensor108,Sensor109,Sensor110,Sensor111,Sensor112,Sensor113,
        Sensor114,Sensor115,Sensor116,Sensor117,Sensor118,Sensor119,
        Sensor120,Sensor121,Static]
    let  sensorData= [{
    }]
    for (let sensorName of sensorNames){
        sensorName
    }
    for (i in data) {
        let sensor1Value = Number((data[i].Sensor1))
        sensorData[0]['sensor1'].push(sensor1Value)
    }
    return sensorData
}

function draw(data){
    let ColorDomain = data.map(d => d.Sensor1)
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(ColorDomain))
        .interpolator(d3.interpolateRainbow)

    drawSlider(timeData,sensorData)
    d3.select('svg#pressure-test')
        .attr('width', 400)
        .attr('height', 400)
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
    d3.select('svg#pressure-test')
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