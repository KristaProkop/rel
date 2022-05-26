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
    }
    
    /**
     * Append an svg element to the specified element and draw the chart 
     */
    draw() {
        this.width = this.element.offsetWidth;
        this.height = this.width / 2;
        this.margin = {
            top: 20,
            right: 75,
            bottom: 45,
            left: 50
        };

        this.element.innerHTML = '';
        const svg = d3.select(this.element).append('svg');
        svg.attr('width',  this.width);
        svg.attr('height', this.height);

        this.plot = svg.append('g')
            .attr('transform',`translate(${this.margin.left},${this.margin.top})`);

        this.createScales();
        this.addAxes();
        this.addLine();
    }
    
    /**
     * Calculate max and min data
     */
    createScales() {
        const margin = this.margin;
        
        // 
        const xExtent = d3.extent(this.data, d => d[0]);
        const yExtent = d3.extent(this.data, d => d[1]);

        // force zero baseline if all data points are positive
        if (yExtent[0] > 0) { yExtent[0] = 0; };

        this.xScale = d3.scaleTime()
            .range([0, this.width-margin.right])
            .domain(xExtent);

        this.yScale = d3.scaleLinear()
            .range([this.height-(margin.top+margin.bottom), 0])
            .domain(yExtent);
    }

    /**
     * Create and append axis elements
     */
    addAxes() {
        const margin = this.margin;

        const xAxis = d3.axisBottom()
            .scale(this.xScale)
            .ticks(d3.timeMonth);

        const yAxis = d3.axisLeft()
            .scale(this.yScale)
            .tickFormat(d3.format("d"));

        this.plot.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${this.height - (margin.top + margin.bottom)})`)
            .call(xAxis);

        this.plot.append("g")
            .attr("class", "y axis")
            .call(yAxis)
    }
    
    /**
     * Add Line to chart graphing the data stored in this object
     */
    addLine() {
        const line = d3.line()
            .x(d => this.xScale(d[0]))
            .y(d => this.yScale(d[1]));

        this.plot.append('path')
            .datum(this.data)
            .classed('line', true)
            .attr('d', line)
            .style('stroke', 'black');
    }
    
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
     * Set data to the given city
     * @param {string} city - the city to retrieve data for
     */
    setCity(city) {
        if (city) {
            this.city = city;
            this.getRainfallLastYear(this.city)
                .then(res => {
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