const express = require('express');
// filepath: c:\Users\using\OneDrive\Desktop\reactsetup\backend\routers\userRouter.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('../models/userModel');

const router = express.Router();

// to add a new user to the database.
router.post('/add', (req, res) => {
    // console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//Fetches all users from the MongoDB collection
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
});

//GET route for retrieving a user by ID 
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id) // Model.find({city: req.params.city})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//deleting a user by ID
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});
// PUT route for updating a user by ID
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});


// Get users by city name
router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.error(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                //Authentication Successful
                //Generating a Token 

                const { _id, name, email } = result;
                const payload = { _id, name, email };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);

                    } else {
                        res.status(200).json({ token });
                    }
                })




            } else {
                //AUTHENTICATION FAILED
                res.status(401).json({ message: 'Invalid credentials' })
            }


        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
})

module.exports = router;