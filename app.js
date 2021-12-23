const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const users = require('./routes/api/users');
var passport = require("passport");


//Initialise App
const app = express();  

//Middleware
app.use(bodyParser.urlencoded({
     extended: false
})); 

//Json Body Middleware
app.use(bodyParser.json());

//cors Middleware
app.use(cors());

//setting up the statics directory
app.use(express.static(path.join(__dirname , 'public' )))

//set up passport middleware
app.use(passport.initialize());

//bring in our passport strategy
require("./config/passport")(passport);


//to connct to our database 
//Bring in the database configuration
const db = require('./config/keys').mongoURI;

mongoose.connect(db ,{ 
     useNewUrlParser:true 
}).then( () => {
     console.log(`database connected successfully  ${db}`)
}).catch(err => {
     console.log(`Unable to connect with the database ${err}`)
});    


app.use('/api/users' ,  users);

app.get('/' , (rej , res) => {
     return res.send("<h1>Hello world</h1>")
}) 

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
     console.log(`Server started on port ${PORT}`)       
})