const express = require("express")
const UserModel = require("../modules/users")
const routes = express.Router()


//Add NEW User
routes.post("/user/signup", async (req, res) => {
    const userData = req.body
    try {
        const Users = new UserModel(userData)
        const newUser = await Users.save()
        res.send({message: "User created successfully.",userData})
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

// Login User
routes.post('/user/login', (req,res) => {
    const userData = req.body;

    console.log(userData.email);
    console.log(userData.password);

    UserModel.findOne({email: userData.email}).then((user) => {
        if (user) {
            if (userData.password == user.password) {
                res.send({message: "Login successful"})
            }
            else {
                res.status(500).send({message: "Password is invalid"})
            }
        } else {
            res.status(500).send({message: "Email is not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: "Invalid Login"})
    })
  })

module.exports = routes