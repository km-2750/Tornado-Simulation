let margin = 10
let scale = 3
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
var allGroup = ["i-2", "i-1", "i", "i+1", "i+2"]

// add the options to the button
d3.select("#selectButton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; })
trialData = []
circleData = []
d3.csv('pressureTapInfo.csv').then(d=> {
    circleData = d
    d3.csv('tornadoPressureData1.CSV').then(d => {
        drawData(d) 
        trialData = d
    })
})


function drawData(data){
    //Javascript drawing function for whole page relating to data
    let cleanedData = analyzeData(data)
    let sensorData = getSensorData(data)
    let timeData = getTimeData(data)
    updateColor()
    drawInteraction(cleanedData)
}

function analyzeData(data){
    //Takes in data and reformats to array of first a time object then sensor objects
    //from reformated arrays for sensor data and time data
    let cleanedData = []
    timeData = getTimeData(data)
    sensorData = getSensorData(data)
    cleanedData.push(timeData)
    for (let value of sensorData){
        cleanedData.push(value)
    }
    return cleanedData
}
function getTimeData(data){
    //takes csv data returns object of time
    let timeArray = []
    for (i in data) {
        let timeValue = Number((data[i].Time))
        timeArray.push(timeValue)
    }
    let timeObj = {}
    timeObj["Time"] = timeArray
    return timeObj
}
function getSensorData(data){
    //Takes in csv data, reformates to an object for each sensor
    sensorNames = ['Sensor1','Sensor2','Sensor3','Sensor4','Sensor5',
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
        'Sensor90','Sensor91','Sensor92','Sensor93','Sensor94','Sensor95',
        'Sensor96','Sensor97','Sensor98','Sensor99','Sensor100','Sensor101',
        'Sensor102','Sensor103','Sensor104','Sensor105','Sensor106','Sensor107',
        'Sensor108','Sensor109','Sensor110','Sensor111','Sensor112','Sensor113',
        'Sensor114','Sensor115','Sensor116','Sensor117','Sensor118','Sensor119',
        'Sensor120','Sensor121','Static']
    let  sensorData = []
    let count = 0 
    for(let sensorName of sensorNames){
        let sensorValues = []
        for(i in data){
            let sensorValue = Number(data[i][sensorName])
            sensorValues.push(sensorValue)
        }
        sensorObj = {}
        sensorObj['Name'] = sensorName
        sensorObj['PressureData'] = sensorValues
        sensorObj['sensorNumber'] = circleData[count]['sensorNumber']
        sensorObj['group'] = circleData[count]['group']
        sensorObj['cx'] = circleData[count]['cx']
        sensorObj['cy'] = circleData[count]['cy']
        sensorData.push(sensorObj)
        count ++
    }
    return sensorData
}

function drawInteraction(data){
    let ColorDomain = data.map(d => d.Sensor1)
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(ColorDomain))
        .interpolator(d3.interpolateRainbow)
}
let filteredData = []
function updateColor(index = 0){
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(sensorData[0]['PressureData']))
        .interpolator(d3.interpolateRainbow)
    
    for (let group of ['center', 'top', 'bottom', 'left','right']){

        filteredData = sensorData.filter(circle => circle.group === group)
        console.log(sensorData)
        d3.select('svg#pressure-display')
            .selectAll('circle')
            .data(filteredData)
            .join(
                enter => {
                    enter 
                        .select('g#' +group+ '-circles') //' +sensorData[i].group+ '
                        .append('circle')
                        .attr('cx', (d,i) => filteredData[i].cx * scale)
                        .attr('cy', (d,i) => filteredData[i].cy * scale)
                        .attr('r', 5)
                        .attr("stroke","transparent")
                    },
                update => 
                    update  
                        .style("fill", d => pressureColorScale(d.PressureData[index])),
                exit => 
                    exit
                        .remove()
        )
    }
}

/*calls sliderBottom function from some other d3 library (see html header)
sets min max based on data
formats ticks - I don't know what's going on I changed values and didn't get it
on method will update display to show where the slider is but it's continuous
I think we'll need to update it so it is discrete so .0025
*/
let [minTime, maxTime] = [0, 11999]
let transitionTime = 10
let updatingColor = false
let timer

d3.select('#time-slider').on('input', function() {
    update_time(+this.value)
})

d3.select('button#play-pause')
    .on('click', function() {
        let self = d3.select(this)
        updatingColor = !updatingColor
        self.text(updatingColor ? 'Pause' : 'Play')
        if (updatingColor) {
            timer = setInterval(step, transitionTime)
        } else {
            clearInterval(timer)
        }
    })
    .text(updatingColor ? 'Pause' : 'Play')


function update_time(time) {
    if (time > maxTime || time < minTime) {
        time = minTime
    }
    d3.select('#time-display').text(time*.0025)
    d3.select('#time-slider').property('value', time)
    updateColor(time)
}

function step() {
    let time = Number(d3.select('input#time-slider').property('value'))
    if (updatingColor) {
        time = time + 1
        if (time > maxTime || time < minTime) {
            time = minTime
        }
    }
    update_time(time)
}
