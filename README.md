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


Example request to retrieve weather by month:
```
curl --location --request GET 'localhost:3000/rainfall_last_year?city=chicago'
```

TODOs:
- hook into legit weather API
- handle unexpected data from REST endpoint (negative numbers etc)
- separate backend and front ends
- env support
- dockerize
- backend validation for inputs from front end
- eslint and prettier
