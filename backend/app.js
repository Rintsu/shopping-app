const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const SessionModel = require("./models/session");

let app = express();

//User database
mongoose.connect("mongodb://localhost/fs2shopping").then(
    () => console.log("Success connecting to Mongodb"),
    (error) => console.log("Failed connecting to Mongodb. Error: " + error)
);

/*
const registeredUsers = [];
const loggedUsers = [];
*/
//Time to leave 1hour (in milliseconds)
const ttl = 1000*60*60;

//Middlewares - tämä ennen mitään get/post/put/delete-komentoja
//muista content-type: application/json
app.use(bodyParser.json());


//Jostain syystä ei tunnista nuolifunktiota, sen takia alla oleva eslint-käsky
// eslint-disable-next-line no-undef
createToken = () => {
    let token = "";
    let letters = "abcdefghijABCDEFGHIJ0123456789";
    for(let i = 0; i < 512; i++){
        let temp = Math.floor(Math.random()*30)
        token = token + letters[temp]
    }
    return token;
}

// eslint-disable-next-line no-undef
isUserLogged = (req,res,next) => {
    let token = req.headers.token;
    if(!token){
        return res.status(403).json({message:"Forbidden"});
    }
    SessionModel.findOne({"token":token}, function(err, session){
        if(err){
            return res.status(403).json({message:"Forbidden"});
        }
        if(!session){
            return res.status(403).json({message:"Forbidden"});
        }
        let now = Date.now();
        if(now > session.ttl){
            SessionModel.deleteOne({"_id":session._id}, function(err){
                if(err){
                    console.log("Failed to remove session: " + err);
                }
                return res.status(403).json({message:"Forbidden"});
            })
        }
        req.session = {};
        req.session.user = session.user;
        session.ttl = now + ttl;
        session.save(function(err){
            return next();
        })
    })
}

// LOGIN API
app.post("/register", function(req,res){
    if(!req.body){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    if(!req.body.username || !req.body.password){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    if(req.body.username.length < 4 || req.body.password.length < 8){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    //Salasanan salttaus
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) {
            return res.status(422).json({message:"Please provide proper credentials"})
        }
        let user = new UserModel ({
            username: req.body.username,
            password: hash
        })
        user.save(function(err,user){
            if(err) {
                console.log("Register failed. Error: " + err);
                return res.status(409).json({message:"Username is aldready in use"});
            } else {
                console.log("User registered. Username: " + user.username);
                return res.status(200).json({message:"Register success!"});
            }
        })
    });
})

app.post("/login", function(req,res){
    if(!req.body){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    if(!req.body.username || !req.body.password){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    if(req.body.username.length < 4 || req.body.password.length < 8){
        return res.status(422).json({message:"Please provide proper credentials"});
    }
    UserModel.findOne({"username":req.body.username}, function(err,user){
        if(err){
            console.log("Login failed on finding username. Error: " + err);
            return res.status(403).json({message:"Username or password not correct"});
        }
        if(!user){
            return res.status(403).json({message:"Username or password not correct"});
        }
            // eslint-disable-next-line no-loop-func
            bcrypt.compare(req.body.password, user.password, function(err, success){
                if(err) {
                    return res.status(403).json({message:"Username or password not correct"});
                }
                if(!success){
                    return res.status(403).json({message:"Username or password not correct"});
                }
                //Create token
                // eslint-disable-next-line no-undef
                let token = createToken();
                let temp = Date.now();
                let session = new SessionModel({
                    user:user.username,
                    token:token,
                    ttl:temp+ttl
                })
                session.save(function(err, session){
                    if(err){
                        console.log("Session creation failed. Error: " + err);
                        return res.status(403).json({message:"Username or password not correct"});
                    }
                    return res.status(200).json({token:token});
                }) 
            })     
    })
})

app.post("/logout", function(req,res){
    let token = req.headers.token;
    console.log(token);
    if(!token){
        return res.status(404).json({message:"Not found"});
    }
    SessionModel.findOne({"token":token}, function(err, session){
        if(err){
            console.log("Failed to remove session while logging out: " + err);
            return res.status(200).json({message:"Success"});
        }
        if(!session){
            console.log("No session found with sych token");
            return res.status(200).json({message:"Success"});
        }
        SessionModel.deleteOne({"_id":session._id}, function(err){
            if(err){
                console.log("Failed to remove session while logging out: " + err);
            }
            return res.status(200).json({message:"Success"});
        })
    })
})

// eslint-disable-next-line no-undef
app.use("/api", isUserLogged, apiroutes);

app.listen(3001);
console.log("Running in post 3001");