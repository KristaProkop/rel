# Get started
```bash
## install dependencies
npm install

## build app
npm run build

## run dev server
npm run start
```

App is served at [port 3000](http://localhost:3000/)


Example POST request to retrieve weather by month:
```
curl --location --request POST 'localhost:3000/weather' \
--header 'Content-Type: application/json' \
--data-raw '{
    "city": "chicago"
}'
```

TODO:
- clean up js
- eslint and prettier
- automated tests
- remove sales csv copy from package.json