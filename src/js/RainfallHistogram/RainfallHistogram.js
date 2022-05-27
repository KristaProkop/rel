import * as d3 from "d3";

/** Class representing a Histogram chart for rainfall. */
class RainfallHistogram {
    /**
     * Create a chart element and set the city for data retrieval
     * @param {Object} opts - paramaters for the chart
     * @param {HTMLElement} opts.element - The dom element that will contain the chart
     * @param {string} [opts.city] - The city to display data for
     * @param {string} [opts.xAxisName] - The parameter name for the data models' x axis
     * @param {string} [opts.yAxisName] - The parameter name for the data models' y axis
     */
    constructor(opts) {
        this.element = opts.element;
        this.data = this.setCity(opts.city);
        this.xAxisName = opts.xAxisName || "month";
        this.yAxisName = opts.yAxisName || "inches";
    }

    /**
     * Append an svg element to the specified element and draw the chart
     */
    draw = () => {
        this.clearExistingChart();
        const margin = { top: 10, right: 20, bottom: 30, left: 30 };

        // the exact dimensions of 400 x 400
        // will only be used for the initial render
        // but the width to height proportion
        // will be preserved as the chart is resized
        this.width = 400 - margin.left - margin.right;
        this.height = 200 - margin.top - margin.bottom;

        this.setScale();
        this.setDomain();

        this.svg = d3
            .select(`#${this.element.id}`)
            .append("svg")
            .attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom)
            .call(this.responsivefy)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        this.makeRectangles();
        this.addAxes();
    }

    /**
     * Executing this upon an svg will make it more responsive by resizing based on the viewport
     */
    responsivefy = (svg) => {
        const container = d3.select(svg.node().parentNode),
            width = parseInt(svg.style("width"), 10),
            height = parseInt(svg.style("height"), 10),
            aspect = width / height;

        // add viewBox attribute and set its value to the initial size
        // add preserveAspectRatio attribute to specify how to scale
        // and call resize so that svg resizes on inital page load
        svg.attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMinYMid")
            .call(resize);

        // add a listener so the chart will be resized when the window resizes
        d3.select(window).on("resize." + container.attr("id"), resize);

        // this is what actually resizes the chart
        // it will be called on load and window resize
        function resize() {
            const targetWidth = parseInt(container.style("width"));
            svg.attr("width", targetWidth);
            svg.attr("height", Math.round(targetWidth / aspect));
        }
    };

    /**
     * Construct a new band scale
     */
    setScale = () => {
        this.xScale = d3.scaleBand().padding(0.2).range([0, this.width]);

        this.yScale = d3.scaleLinear().range([this.height, 0]);
    };

    /**
     * Scale the range of the data in the domains
     */
    setDomain = () => {
        const data = this.data;

        // x axis is months, as they are
        this.xScale.domain(
            data.map((d) => {
                return d[this.xAxisName];
            })
        );

        // y axis is 0 to the max metric
        this.yScale.domain([
            0,
            d3.max(data, (d) => {
                return d[this.yAxisName];
            }),
        ]);
    };

    /**
     * Create bars on chart
     */
    makeRectangles = () => {
        this.svg
            .selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("x", (d) => this.xScale(d[this.xAxisName]))
            .attr("y", (d) => this.yScale(d[this.yAxisName]))
            .attr("width", (d) => this.xScale.bandwidth())
            .attr(
                "height",
                (d) => this.height - this.yScale(d[this.yAxisName])
            );
    };

    /**
     * Append groups for x and y axes
     */
    addAxes = () => {
        this.svg.append("g").call(d3.axisLeft(this.yScale));

        this.svg
            .append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.xScale));
    };

    /**
     * Removes the first matching svg element. If I had multiple svg elements that could be bad obvi.
     * I should really remove `this.svg` but I didn't have time to implement that.
     */
    clearExistingChart = () => {
        d3.select("svg").remove();
    };

    /**
     * Get data from REST endpoint
     * @param {string} city - the city to retrieve data for
     */
    getData = (city) => {
        return (
            d3
                .json(`http://localhost:3000/rainfall_last_year?city=${city}`)
                // IRL we'd have some fallback logic
                .catch((err) => console.error(err))
        );
    };

    /**
     * Set the new data to visualize and redraw the viz
     * @param {object} newData - the data to visualize
     */
    setData = (newData) => {
        this.data = newData;
        this.draw();
    }

    /**
     * Set the current city and update data to match
     * @param {string} city - the city to retrieve data for
     */
    setCity = (city) => {
        if (city) {
            this.city = city;
            this.getData(this.city).then((res) => {
                // Should handle errors and unexpected responses too
                this.setData(res.total_rainfall);
            });
        }
    }
}

export default RainfallHistogram;
