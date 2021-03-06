// import oracledb package to connect to oracle database instance
const oracledb = require('oracledb');

// import database connection credentials
const dbConfig = require('./dbConfig');

// *** FUNCTION - creates establish connection to oracle database
/*
At this point the connection function only serves to test the user credentials because each
database function uses those same credentials to creat a connection and then perform an action
there is no need to have a single connection function. If we switch to a dbPool for the application
this function can be altered
 */
const dbConnect = async() => {
  try {
    //create variable set to configuration of oracle connection pool
    await oracledb.createPool(dbConfig);
    //success pool message
    console.log( "Connected to Oracle DB")

  } catch (error) {
    // log any connection errors
    console.error( error.message + "\n" );
  }

};


// ***  FUNCTION- implements the created database schema to be used to stor application data
const dbSeed = async() =>{

  try {

    // connect to db via the pool alias 'lifeChoices'
    let conn = await oracledb.getConnection(dbConfig);

    // execute SQL Statement to create database schema
    await conn.execute(`create schema authorization JAMES
    CREATE TABLE Characters (
      character_id number primary key,
      name varchar2(50),
      character_alias varchar2(50) unique,
      occupation varchar2(50),
      wallet number,
      experience number
      )
    CREATE TABLE Objects (
      object_id number primary key,
      obj_description varchar2(200),
      obj_effect varchar2(200),
      obj_limit number,  -- set to default
      obj_price number
      )
    CREATE TABLE Skills(
      skill_id number primary key,
      skill_description varchar2(200),
      skill_effect varchar2(200),
      required_experience number  -- set default limit
      )
    CREATE TABLE Players(
      player_id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY,
      e_mail varchar2(100) unique,
      pass_word varchar2(100),
      character_id NUMBER REFERENCES characters (character_id),
      player_alias varchar2(100) REFERENCES characters (character_alias)
      )
    CREATE TABLE character_skills (
      skill_id number REFERENCES Skills (skill_id),
      skill_name varchar2(50),
      skill_level number
      )
    CREATE TABLE character_objects (
      object_id number REFERENCES Objects (object_id),
      object_name varchar2(20),
      object_amount number
      )`);

    // display message for successful Connection and Schema creation
    console.log('Oracle - Schema Created')

  } catch (error) {

    // log any errors to console if connection fails
    console.log(error.message + "\n")

  }
};

//  *** FUNCTION - adds dummy data to db tables
// Object will be returned, table data in rows array of return object
const dummyData = async() => {

  try {

    // create new connection
    let conn = await oracledb.getConnection(dbConfig)

    // SQL INSERT statement
    let sql = `INSERT INTO Players ( e_mail, pass_word, character_id, player_alias )
    VALUES ( :a, :b, :c, :d )`;

    // Values to be INSERTED into table
    let binds = [
      { a:'jt@gmail.com', b:'jt123', c:null, d:null },
      { a:'kt@gmail.com', b:'kt123', c:null, d:null },
      { a:'lz@gmail.com', b:'zp123', c:null, d:null },
      { a:'kl@gmail.com', b:'kl123', c:null, d:null },
      { a:'qr@gmail.com', b:'qtr23', c:null, d:null },
    ];

    // database options for values and return messages
    let options = {
      dmlRowCounts: true,
      autoCommit: true,
      batchErrors: true,
      };

      // execute the batch INSERT statement
      const result = await conn.executeMany(sql, binds, options);

      // log the results
      console.log('*** Dummy Data Entered ***', result.rows)

    // return transaction results *** Query Data*** = result.rows
      return result;

    } catch (error) {

    // log any errors to console if connection fails
    console.log(error.message + "\n")

    };

};


// ***  FUNCTION - adds new player to database
// Object will be returned, table data in rows array of return object
const addPlayer = async( eMail, passWord ) =>{

  try {

    // create new connection
    let conn = await oracledb.getConnection(dbConfig);

    //execute sql statement
    let result = await conn.execute( `INSERT INTO Players ( e_mail, pass_word ) VALUES (:0, :1)`, [ eMail, passWord ],{ autoCommit: true } );

    // return transaction results *** Query Data*** = result.rows
    return result;


    } catch (error) {

      // log any errors to console if connection fails
      console.log(error.message + "\n")

    }

};

// ***  FUNCTION - locates existing  player in database by email && passWord
// Object will be returned, table data in rows array of return object
const findPlayer = async( eMail, passWord ) =>{

  try {

    // create new connection
    let conn = await oracledb.getConnection(dbConfig);

    //execute sql statement
    let result = await conn.execute( `SELECT * FROM Players WHERE E_MAIL='${eMail}' AND PASS_WORD='${passWord}'` );

    // return transaction results *** Query Data*** = result.rows
    return result;

    } catch (error) {

      // log any errors to console if connection fails
      console.log(error.message + "\n")

    }

};


// Test functions
// dbConnect()
// dbSeed()
// dummyData()
// addPlayer('test3@gmail.com','test3123').then(result =>{console.log(result)})
// findPlayer('jt@gmail.com','jt123').then(result =>{console.log(result.rows)})

module.exports = {
  dummyData,
  addPlayer,
  findPlayer,
  dbSeed,
  dbConnect
};



