import { RainfallHistogram } from "./RainfallHistogram";

/** Initialize a histogram and listen for city selection.
 *  IRL we would might have a city pre-selected or some other default displayed
 */
 window.addEventListener('DOMContentLoaded', (event) => {
    const histogram = new RainfallHistogram();
    const citySelection = document.getElementById("cities");
    citySelection.addEventListener("change", histogram.getRainfallLastYear);
});


