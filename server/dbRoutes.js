// import express package
let express = require('express');

// create new express router instance
let router = express.Router();

// import database Functions to use in routes
const {
  dummyData,
  addPlayer,
  findPlayer,
  dbSeed,
  dbConnect
} = require('./dbFunctions')


// Routes
// full endpoint =>  http://localhost:3000/db/**endpoint**

router
  // GET user information by email + password
  .get('/players/:email/:password', async ( req, res ) => {
    const { email, password } = req.params;
    // add in db functions

    try {

      // use db function to find player data attempting to login
      await findPlayer( email, password )

          // handle the returned promise
          .then( result => {
            // deconstruct rows from result object
            const { rows } = result;

            // check length of rows array
            if( rows.length ){

              // if rows array has length respond with data
              res.send( rows );

              // redirect player to splash page
              // res.redirect('/')
            }
            // if no data is returned
            else{

              // add new player data to db
              addPlayer( email, password )

                // handle returned promise
                .then( result => {

                  // deconstruct rows from result object
                  const { rows } = result;

                  // send back new player information
                  res.send( rows );

                  // redirect player to splash page
                  // res.redirect('/')

                })
            }
          })

    } catch (error) {
      // log any errors to console if connection fails
      console.log(error.message + "\n")
    }

  })

  // GET character by player_id
   .get('/characters/:player_id', ( req, res ) => {
    const { player_id } = req.params;
     res.send( `GET Character By ( player_id = ${player_id} ) Route` )
   })


   // Add a new User information to database
   .post('/players/:email/:password', ( req, res ) => {
    const { email, password } = req.params;
     res.send( `POST Player (player credentials ${email} ${password} ) Data Route` )
   })

   // Add new Character information to database
   .post('/characters/:player_id', ( req, res ) => {
    const { player_id } = req.params;
     res.send( `POST Character By ( player_id = ${player_id} ) Route` )
  })

  // Update player information
  .put('/players/:player_id', ( req, res ) => {
    const { player_id } = req.params;
     res.send( `PUT Player ( player_id ${player_id} ) Route` )
   })

  // Update character information
  .put('/characters/:player_id', ( req, res ) => {
    const { player_id } = req.params;
     res.send( `PUT Character ( player_id = ${player_id} ) Route` )
  })



module.exports = router;