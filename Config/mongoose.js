//Require the library
const mongoose= require('mongoose');

//Connecting to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection to check if it is successfully connected to DB
const db= mongoose.connection;

//For printing error 
db.on('error',console.error.bind(console,'error connecting to db!'));

//For printing successful message
db.once('open',function(){
    console.log('Successfully connected to DB!');
});

module.exports=db;