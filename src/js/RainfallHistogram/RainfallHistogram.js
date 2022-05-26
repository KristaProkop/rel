import * as d3 from "d3";

/** Class representing a Histogram chart for rainfall. */
class RainfallHistogram {
    /**
     * Create an svg of specific dimensions to display histographic data.
     * No data will be available until generateHistogram() is executed with
     * the data model.
     * @param {object} margin - the desired margin of the histogram
     */
    constructor(margin = { top: 20, right: 20, bottom: 30, left: 40 }) {
        // set the basic properties of the chart
        this.margin = margin;
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.x = d3.scaleBand().range([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.fillColor = "#5C9C8D";

        // append the svg to the body
        // append a 'group' element to 'svg'
        // move the 'group' element to the top left margin
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

    /**
     * Removes existing contents of the SVG element
     */
    clearContents = () => {
        this.svg.selectAll("*").remove();
    };

    /**
     * TODO: Break this out into smaller functions. We should only ever reference the name of the 
     * axes once as constants ("month" and "inches") and then refer to those constants instead of hardcoding them 
     * everywhere.
     * 
     * Given rainfall data per model below, set the ranges of both axes and render the data
     * {
     *      "city": "Chicago",
     *      "total_rainfall": [
     *         { "month": "Jan", "inches": 1.1 },
     *         { "month": "Feb", "inches": 1.5 },
     *         ...
     *      ]
     *  }
     * @param {object} rawWeatherData - the data retrieved from our previous year's rainfall api
     */
    renderRainfallByMonth = (rawWeatherData) => {
        this.clearContents();
        const data = rawWeatherData.total_rainfall;

        // Scale the range of the data in the domains
        this.x.domain(
            data.map((d) => {
                return d.month;
            })
        );
        this.y.domain([
            0,
            d3.max(data, (d) => {
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

    /**
     * Get rainfall data from REST endpoint
     * @param {object} e - event listener data;
     */
    getRainfallLastYear = (e) => {
        d3.json(
            `http://localhost:3000/rainfall_last_year?city=${e.target.value}`
        )
            .then(this.renderRainfallByMonth)
            // IRL we'd have some fallback logic
            .catch((err) => console.error(err));
    };
}

export default RainfallHistogram;
