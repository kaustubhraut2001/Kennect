const express = require('express');

const router = express.Router();
const user = require('../Models/User');
const bcrypt = require('bcryptjs');


router.post('/', async(req, res) => {

    try {
        const { name, email, password } = req.body;
        console.log(name);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);




        const newUser = new user({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);



    } catch (error) {
        res.status(500).json({ message: error.message });


    }

});


//login route

router.post('/login', async(req, res) => {

    try {

        const { email, password } = req.body;

        const users = await user.findOne({ email: email });

        const { email: email1, password: password1 } = users;


        bcrypt.compare(password, password1).then(function(result) {

            if (result == true) {
                console.log("Login Successful");
                res.status(200).json(users);
            } else {
                console.log("Login Failed");
                res.status(500).json({ message: error.message });
            }
        })







    } catch (error) {
        res.status(500).json({ message: error.message });



    }
});



router.get('/:email', async(req, res) => {
    try {
        const users = await user.findById(req.params.email);

        const { email, password } = users;
        console.log(email);

        bcrypt.compare(password, password).then(function(result) {

            if (result == true) {
                console.log("Login Successful");
                res.status(200).json(users);
            } else {
                console.log("Login Failed");
                res.status(500).json({ message: error.message });
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message });

    }

});

module.exports = router;