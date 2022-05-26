const express = require("express");
const fsPromises = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

/**
 * Given a city param, return rainfall data for that city.
 */
function rainfallHandler(req, res) {
    const city = req.query.city;
    getCityWeatherData(city)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
}
app.get("/rainfall_last_year", rainfallHandler);

/**
 * Given a city param, find a corresponding data in "data store"
 * @param {string} city - the city name to retrieve data for
 * TODO: Handle case sensitivity for different OSs
 */
const getCityWeatherData = (city) => {
    const filepath = `json/${city}.json`;
    return fsPromises.readFile(filepath, (err, data) => {
        if (err) throw err;
        JSON.parse(data);
    });
};
