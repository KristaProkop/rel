import * as d3 from "d3";

class Histogram {
    constructor(margin = { top: 20, right: 20, bottom: 30, left: 40 }) {
        // set the dimensions and margins of the graph
        this.margin = margin;
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.x = d3.scaleBand().range([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.fillColor = "#5C9C8D";

        // append the svg to the body
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        this.svg = d3
            .select("body")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr(
                "transform",
                `translate(${this.margin.left},${this.margin.top})`
            )
            .style("fill", this.fillColor);
    }

    clearViz = () => {
        this.svg.selectAll("*").remove();
    };

    generateHistogram = (rawWeatherData) => {
        this.clearViz();
        const data = rawWeatherData.avg_rainfall;

        // format the data
        data.forEach((d) => {
            d.inches = +d.inches;
        });

        // Scale the range of the data in the domains
        this.x.domain(
            data.map(function (d) {
                return d.month;
            })
        );
        this.y.domain([
            0,
            d3.max(data, function (d) {
                return d.inches;
            }),
        ]);

        // rectangles for bar chart
        this.svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => {
                return this.x(d.month);
            })
            .attr("width", this.x.bandwidth())
            .attr("y", (d) => {
                return this.y(d.inches);
            })
            .attr("height", (d) => {
                return this.height - this.y(d.inches);
            });

        // x axis
        this.svg
            .append("g")
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisBottom(this.x));

        // y axis
        this.svg.append("g").call(d3.axisLeft(this.y));
    };
}

export default Histogram;
