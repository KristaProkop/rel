import { Histogram } from "./histogram";

/** Initialize a histogram and listen for city selection.
 *  IRL we would might have a city pre-selected or some other default displayed
 */
const histogram = new Histogram();
const citySelection = document.getElementById("cities");
citySelection.addEventListener("change", histogram.getRainfallLastYear);
