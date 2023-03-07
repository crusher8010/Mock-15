const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Register = (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        bcrypt.hash(password, 5, async (err, code) => {
            if (err) {
                res.status(400).json({
                    status: "failure",
                    message: err
                })
            } else {
                const newUser = await User.create({ fullname, email, password: code });

                res.status(201).json({
                    status: "success",
                    newUser
                })
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let getUser = await User.find({ email });

        if (getUser.length > 0) {
            bcrypt.compare(password, getUser[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: getUser[0]._id }, process.env.Key);
                    res.status(201).json({
                        message: "Login Successful",
                        token
                    })
                } else {
                    res.status(400).json({
                        status: 'failure',
                        message: 'Wrong Credentials'
                    })
                }
            })
        } else {
            res.status(400).json({
                status: 'failure',
                message: 'Wrong Credentials'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
}