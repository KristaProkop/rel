import { RainfallHistogram } from "./RainfallHistogram";
import { select as d3Select } from "d3";

/** Initialize a histogram.
 *  IRL we would might have a city pre-selected or some other default displayed
 */
window.addEventListener("DOMContentLoaded", (event) => {
    const chart = new RainfallHistogram({
        element: document.querySelector("#chart"),
    });

    // Listen for city selection
    d3Select("#cities").on("change", (e) => {
        const city = e.target.value;
        chart.setCity(city);
    });
});
