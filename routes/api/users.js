const express = require("express");
const router = express.Router();
const bycrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const key = require("../../config/keys").secret;
const passport = require("passport");
const User = require("../../model/User.js")

""

/**
 * @route POST api/users/register
 * @desc register the users
 * @access Public
 */

router.post('/register' , (req , res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password 
    } = req.body;
    if(password !== confirm_password){
        return res.status(400).json({
            msg:'Password is not a match'
        });
    }
    //check for unique username
    User.findOne({username:username}).then( user => {
        if(user){
            return res.status(400).json({
                msg:"Username is already taken"
            });
        }        
    });
    //check for unique email address
    User.findOne({email:email}).then( email => {
        if(email){
            return  res.status(400).json({
                msg:"email is already taken"
            });
        }
    });
    //the data is valid and now we can save the data into database
    let newUser = new User({
        name , 
        username, 
        password,
        email
    });
    //hash password
    bycrpt.genSalt(10 , (err , salt) => {
        bycrpt.hash(newUser.password , salt , (err , hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then( user => {
                return res.status(201).json({
                    success: true,
                    msg:"User created successfully!"
                });
            });
        });
    });
});

//create the login router
/**
 * @route POST api/users/login
 * @desc log users into application
 * @access Public
 */

router.post('/login', (req , res) => {
    User.findOne({username: req.body.username}).then( user => {
        if(!user){
            return res.status(404).json({
                msg:"Username does not exist",
                success:true,
            });
        }
        //if there is user compare the password if they match
        bycrpt.compare(req.body.password , user.password).then(isMatch => {
            if(isMatch){
                //User password is correct and we need to send the json token for the user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email:  user.email
                }
                jwt.sign(payload , key , { expiresIn: 604800} , (err , token) => {
                   res.status(200).json({
                       success: true,
                       user:user,
                       token:`Bearer ${token}`,
                       msg:"Hurray , you are now logged in",
                   }); 
                });
            }else{
                 return res.status(404).json({
                     msg: "Incorrect password",
                     success: true
                 });
            }
        }) 
    })
});

/**
 *  @route POST api/users/profile
 *  @desc Return the user's data
 *  @access Private
 */
router.get('/profile',  passport.authenticate('jwt' , {
    session:false
}), (req , res) => {
    return res.json({
        user: req.user
    })
});


module.exports = router;
