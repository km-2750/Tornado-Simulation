//Append a defs (for definition) element to your SVG
var defs = svg.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

//Horizontal gradient
linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

//Set the color for the start (0%)
linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffa474"); //light blue

//Set the color for the end (100%)
linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#8b0000"); //dark blue

//Draw the rectangle and fill with gradient
svg.append("rect")
    .attr('x', dispWidth - 50 - margin)
    .attr('y', margin)
    .attr("width", 10)
    .attr("height", 50)
    .style("fill", "url(#linear-gradient)");