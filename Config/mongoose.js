const mongoose = require('mongoose')

// connect to database
mongoose.connect('mongodb://localhost/TODO_list_db')

//acquire the connection to check if it is running
const db = mongoose.connection

// if error print
db.on('error', console.error.bind(console,'error connecting to db'))
// if successful then print
db.once('open', function(){
    console.log('sucessfully connected to database');
})