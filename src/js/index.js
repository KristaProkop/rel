import * as d3 from "d3";

// set the dimensions and margins of the graph
const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
const y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
     
const generateHistogramWeather = (rawWeatherData) => {
  console.log(rawWeatherData);

  const data = rawWeatherData.avg_rainfall

  // format the data
  data.forEach(function(d) {
    d.inches =+ d.inches;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.inches; })]);

  // rectangles for bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.inches); })
      .attr("height", function(d) { return height - y(d.inches); });

  // x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
}

const city = "chicago";
d3.json(`http://localhost:3000/weather?city=${city}`).then(generateHistogramWeather);