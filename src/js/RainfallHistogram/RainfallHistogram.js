import * as d3 from "d3";

/** Class representing a Histogram chart for rainfall. */
class RainfallHistogram {
     /**
     * Create a chart element and set the city for data retrieval
     * @param {object} opts - parameters for the chart
     */
    constructor(opts) {
        this.element = opts.element;
        this.data = this.setCity(this.city)
        this.xAxisName = opts.xAxisName || 'month';
        this.yAxisName = opts.yAxisName || "inches";
    }
    
    /**
     * Append an svg element to the specified element and draw the chart 
     */
    draw() {
        this.clearExistingChart();

        // set dimensions
        const margin =  { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = 960 - margin.left - margin.right;
        this.height = 500 - margin.top - margin.bottom;
        this.setScale()

        // append the svg to the body and a 'group' element to svg
        this.svg = d3
            .select(`.${this.element.className}`)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                `translate(${margin.left},${margin.top})`
            )

        this.setDomain()
        this.makeRectangles();
        this.addAxes();
    
    }

    /**
     * Construct a new band scale
     */
    setScale = () => {
        this.x = d3.scaleBand().range([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().range([this.height, 0]);
    };

    
    /**
     * Scale the range of the data in the domains
     */
    setDomain = () => {
        const data = this.data;

        // x axis is months, as they are
        this.x.domain(
            data.map((d) => {
                return d[this.xAxisName];
            })
        );

        // y axis is 0 to the max metric
        this.y.domain([
            0,
            d3.max(data, (d) => {
                return d[this.yAxisName];
            }),
        ]);
    }
    /**
     * Create bars on chart
     */
    makeRectangles = () => {
        const barClassName = 'bar';
        this.svg
            .selectAll(`.${barClassName}`)
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", barClassName)
            .attr("x", (d) => {
                return this.x(d[this.xAxisName]);
            })
            .attr("width", this.x.bandwidth())
            .attr("y", (d) => {
                return this.y(d[this.yAxisName]);
            })
            .attr("height", (d) => {
                return this.height - this.y(d[this.yAxisName]);
            });
    }

    /**
     * Append groups for x and y axes
     */
    addAxes = () => {
        // x axis
        this.svg
            .append("g")
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisBottom(this.x));

        // y axis
        this.svg.append("g").call(d3.axisLeft(this.y));
    }

    /**
     * Removes the first matching svg element. If I had multiple svg elements that could be bad obvi.
     * I should really remove `this.svg` but I didn't have time to implement that.
     */
     clearExistingChart = () => {
        d3.select("svg").remove(); 
    };

   
    /**
     * Get rainfall data from REST endpoint
     * @param {string} city - the city to retrieve data for
     */
     getRainfallLastYear = (city) => {
        return d3.json(
            `http://localhost:3000/rainfall_last_year?city=${city}`
        )
            // IRL we'd have some fallback logic
            .catch((err) => console.error(err));
        
    };

     /**
     * Set the current city and update data to match
     * @param {string} city - the city to retrieve data for
     */
    setCity(city) {
        if (city) {
            this.city = city;
            this.getRainfallLastYear(this.city)
                .then(res => {
                    // Should handle errors and unexpected responses too
                    this.setData(res.total_rainfall)
                })
        }
    }

    /**
     * Set the new data to visualize and redraw the viz
     * @param {object} newData - the data to visualize
     */
    setData(newData) {
        this.data = newData;
        this.draw();
    }
}

export default RainfallHistogram;