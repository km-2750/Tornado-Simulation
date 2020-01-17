let time = 0
d3.csv('tornadoPressureData1.csv')
    .then(function(data) {

    })
    .catch(function(error) {

    })

let data = [0,1,2,3];

function slideTime() {
    d3.select("p#time-display")
        .text(`The time is ${time}`)
}

d3.select("input#myRange")
