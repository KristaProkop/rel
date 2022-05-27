import { RainfallHistogram } from "./RainfallHistogram";
import * as d3 from "d3";


 window.addEventListener('DOMContentLoaded', (event) => {
    const chart = new RainfallHistogram({
        element: document.querySelector('#weather_viz')
    });
    d3.select(window).on('resize', () => chart.draw() );
    d3.select("#cities").on("change", (e) => {
        const city = e.target.value
        chart.setCity(city) 
    });
});

