# Get started
```bash
## use proper node version from `.nvmrc` file
nvm use

## install dependencies
npm install

## build app
npm run build

## run dev server
npm run start

## fix style and formatting
npm run prettier
```

App is served at [port 3000](http://localhost:3000/)


Example POST request to retrieve weather by month:
```
curl --location --request GET 'localhost:3000/weather?city=chicago'
```

TODOs for a prod-ready app:
- env support 
- separate backend and front ends
- dockerize
- backend validation for inputs from front end
- eslint and prettier
- automated tests
