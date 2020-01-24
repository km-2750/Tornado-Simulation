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
const dispWidth = (2 * margin) + ((2 * leftRightWidth) + centerWidth) + 100 + margin
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

const averaging = ["None", "+/- 1", "+/- 2", "+/- 3", "+/- 4","+/- 5"]
// add the options to the button
d3.select("#selectButton")
    .on('change', () =>  updateColor(time))
    .selectAll('myOptions')
    .data(averaging)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; })
d3.select("#selectButton").property('value', '+/- 2')

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
    findMaxMin()
    drawColorScale()
    drawGradient()
    drawScale()
    updateColor(time)
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

maxMin = []

function findMaxMin() {
    for (i=0; i<=121; i++) {
        maxMin.push((d3.extent(sensorData[i]['PressureData']))[0])
        maxMin.push((d3.extent(sensorData[i]['PressureData']))[1])
    }
}
let pressureColorScale = 0

function drawColorScale() {
    pressureColorScale = 
        d3.scaleSequential()
            .domain(d3.extent(maxMin))
            .interpolator(d3.interpolateRainbow)
}

let filteredData = []
function updateColor(index = 0){
    console.log(maxMin)
    let selectValue = d3.select("#selectButton").property('value')
    let precision = averaging.indexOf(selectValue)
    for (let group of ['center', 'top', 'bottom', 'left','right']){

        filteredData = sensorData.filter(circle => circle.group === group)
        d3.select('svg#pressure-display')
            .select('g#' +group+ '-circles')  //' +sensorData[i].group+ '
            .selectAll('circle')
            .data(filteredData)
            .join(
                enter => {
                    enter
                        .append('circle')
                        .attr('cx', (d,i) => (filteredData[i].cx * scale))
                        .attr('cy', (d,i) => (filteredData[i].cy * scale))
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

function movingAverages (data, index, precision) {
    if (index > (minTime + precision) && index < (maxTime - precision)){
        let sum = 0
        let average
        for (let i = index-precision; i <= index+precision; i++){
            sum += data.PressureData[i]
        }
        average = sum/(2*precision+1)
        return average
    }  else{
        return data.PressureData[index]
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
let time

d3.select('#time-slider').on('input', function() {
    update_time(+this.value)
    time = +this.value
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
    d3.select('#time-display').text(time/400)
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
function drawGradient() {
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
        for (let i=0; i<=10; i++) {
            d3.select('#linear-gradient')
                .append("stop")
                .attr("offset", `${i * 10}%`)
                .attr("stop-color", `${pressureColorScale((((((d3.extent(maxMin))[1]) - (d3.extent(maxMin))[0])) / 10) * i)}`)
                console.log(((((d3.extent(maxMin))[1]) - ((d3.extent(maxMin))[0])) / 10) * i)
                console.log(d3.extent(maxMin))
        }
}
let legendScale = 0
let legendAxis = 0
function drawScale() {
    d3.select('g#legend')
        .append("rect")
        .attr('x', 0)
        .attr('y', 0)
        .attr("width", 20)
        .attr("height", 2 * bottomTopHeight + centerHeight)
        .style("fill", "url(#linear-gradient)")
    legendScale =
        d3.scaleLinear()
            .domain(d3.extent(maxMin))    // data
            .range([0, 2 * bottomTopHeight + centerHeight])      // SVG positions
    legendAxis = d3.axisRight(legendScale)
    d3.select('g#legend')
        .attr('transform', `translate(${dispWidth - 100}, ${margin})`)
        .append('g')
        .attr('id', 'axis')
        .call(legendAxis)
        .attr('transform', 'translate(30, 0)')
}