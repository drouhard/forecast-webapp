# Forecast app

## Usage
1. `npm i`
2. `npm run build` compiles the javascript
3. add the proper API keys to a .env file (see .env.example)
4. run `nodemon server.js` to start the server
5. go to localhost:5000/index.html to access the app

## Testing
`npm run test`

## Contributing

Here is a short list of enhancements that would be welcome.

* Testing is woefully inadequate. This is the main area that needs improvement. There are many test stubs to build out.
* Search the repo for "TODO" for inline suggestions
* Add a minute-by-minute precipitation line graph
* Use express to render and serve `index.html` from `/`
* Style the thing. Even Bootstrap would be an improvement
* `main.jsx` could use a refactor. Most of it should probably be separated out into a presentational component
* Implement some form of caching, perhaps with localStorage
