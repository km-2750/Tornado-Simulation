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

function updateColor(index = 0){
    let pressureColorScale = 
    d3.scaleSequential()
        .domain(d3.extent(sensorData[0]['PressureData']))
        .interpolator(d3.interpolateRainbow)
    d3.select('svg#pressure-display')
        .selectAll('circle')
        .data(sensorData)
        .join(
            enter => 
                enter 
                    .select('g#' +sensorData[0].group+ '-circles') //' +sensorData[i].group+ '
                    .append('circle')
                    .attr('cx', (d,i) => sensorData[i].cx * scale)
                    .attr('cy', (d,i) => sensorData[i].cy * scale)
                    .attr('r', 5)
                    .attr("stroke","transparent"),
            update => 
                update  
                    .style("fill", d => pressureColorScale(d.PressureData[index])),
            exit => 
                exit
                    .remove()
        )
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
