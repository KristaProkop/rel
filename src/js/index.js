import { RainfallHistogram } from "./RainfallHistogram";
import * as d3 from "d3";

/** Initialize a histogram .
 *  IRL we would might have a city pre-selected or some other default displayed
 */
window.addEventListener("DOMContentLoaded", (event) => {
    const chart = new RainfallHistogram({
        element: document.querySelector("#weather_viz"),
    });

    // Redraw on page resize. IRL it might be worth ‘throttling’ this
    d3.select(window).on("resize", () => chart.draw());

    // Listen for city selection
    d3.select("#cities").on("change", (e) => {
        const city = e.target.value;
        chart.setCity(city);
    });
});
