# Get started
```bash
## use proper node version from `.nvmrc` file
nvm use

## install dependencies
npm install

## build app
npm run build

## fix style and formatting
npm run prettier

## run dev server
npm run start
```
App is served at [port 3000](http://localhost:3000/)


# Summary

## Requirements: 
> Build a web page that displays a histogram that is capable of visualizing average rainfall per month by US city.
> - [x] A statically hosted page that produces a histogram visualization (using your choice of js visualization library).
> - [x] Hosted backend REST API serving a route to be called by the hosted page's JavaScript application.
> - [x] Average rainfall REST API endpoint
            request: includes parameter supplying the name of a city in the US.
            response: returns JSON representing the model data to be visualized.
> - [x] Page makes an asynchronous request to your API endpoint for the JSON model data.
> - [x] Response model data is fed to the histogram visualization and visualized on the page.
> - [ ] Add automated test coverage.

## Bonus Points:
> - [x] Use some sort of build/bundler system to produce the distributable front end application files.
 
This project is comprised of a static web app and an express server. The server serves
one endpoint which takes a city name and responds with data corresponding to that city.
The sample data backing the endpoint is static JSON data in the [json](./json/) directory.

Majority of my time was spent learning how to do data viz and understanding the intricacies of the library I chose, D3. If this were real world work I would *definitely* spend some more time breaking up the chart module into more easily extendable components. I've included comments pointing out where and how I would make improvements. 

# Examples 
Example request to retrieve weather by month:
```
curl --location --request GET 'localhost:3000/rainfall_last_year?city=chicago'
```
CURRENT Response, not ideal but I am working out how to plot strings on the x axis:
```
{
    "city": "Chicago",
    "total_rainfall": [
        [0, 10],
        [1, 70],
        [2, 30],
        [3, 10],
        [4, 40]

    ]
}


DESIRED Response when I figure out how to plot axes properly!  :
```
{
    "city": "Chicago",
    "total_rainfall": [
        { "month": "Jan", "inches": 1.1 },
        { "month": "Feb", "inches": 1.5 },
        { "month": "Mar", "inches": 3.2 },
        { "month": "Apr", "inches": 8.6 },
        { "month": "May", "inches": 30.0 },
        { "month": "Jun", "inches": 20.2 },
        { "month": "Jul", "inches": 21.8 },
        { "month": "Aug", "inches": 15.1 },
        { "month": "Sep", "inches": 20.2 },
        { "month": "Oct", "inches": 10.0 },
        { "month": "Nov", "inches": 8.0 },
        { "month": "Dec", "inches": 2.5 }
    ] 
}
```

# Todos in the real world:
- Fix the axis plotting problem referenced above
- We probably want to create histograms for a variety of data sets. We could pull some of the functionality to a generic Histogram class that will render whatever data set it's given, instead of only having a rainfall histogram class. 
- hook into legit weather API
- error handling for api response data (negative numbers etc)
- backend validation for inputs from front end
- separate the backend and front end to deploy independently
- full stack live reload for local dev
- env support
- dockerize
- eslint