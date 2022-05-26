import { json as d3Json } from "d3";
import { Histogram } from "./histogram";

const chart = new Histogram();

function getWeatherData() {
    d3Json(
        `http://localhost:3000/weather?city=${this.value.toLowerCase()}`
    ).then(chart.generateHistogram);
}
const citySelection = document.getElementById("cities");
citySelection.addEventListener("change", getWeatherData);
