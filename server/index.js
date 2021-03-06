// require express for application server
const express = require('express');

// require package to allow use of .env file
require('dotenv').config();

// require DbFunctions file so they can be used/tested
require('./dbFunctions');

//require dbRoutes file
const dbRoutes = require('./dbRoutes')

// require package that service static front end files ./client/dist
const path = require('path');

// set the port number for the application server
const port = 3000

// create path parameters for express to locate front end files
const frontEnd = path.join(__dirname, '..', 'client', 'dist')

// invoke express package function
const app = express()

// use express package static middleware to server front end files
app.use(express.static(frontEnd))

// tell express package to use dbRoutes to respond to all db requests
app.use('/db', dbRoutes )

// use express listen function to invoke server instance, set to PORT for requests
app.listen(port, () => console.info(`http://localhost:${port}`))

