const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/weather', (req, res) => {
    const city = req.body;
    console.log(city);
    const weatherByMonth = generateMockWeatherDataByMonth();
    res.send(weatherByMonth);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});


const generateMockWeatherDataByMonth = () => {
  const monthlyStats = (month) => {
    return  { 
      "month": month, 
      "precipitation_inches": Math.floor(Math.random() * 10)
    }
  }
  const result = Array.from(Array(12)).map((_, i) => monthlyStats(i));
  return {
    "data": result
  }
  
}