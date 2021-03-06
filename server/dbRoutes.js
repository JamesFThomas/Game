// import express package
let express = require('express');

// create new express router instance
let router = express.Router();


// Routes
// http://localhost:3000/db

router
  // GET user information by email + password
  .get('/players/:email/:password', ( req, res ) => {
    const { email, password } = req.params;
    res.send( `GET Player By ( user credentials = ${email} + ${password} ) Route` )
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