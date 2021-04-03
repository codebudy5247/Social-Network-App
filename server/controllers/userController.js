import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'

import User from "../models/userModel.js";

const signup = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatar,
        username
    } = req.body;

    try {
        const oldUser = await User.findOne({email});

        if (oldUser) 

            return res.status(400).json({msg: "Email is taken"})


        


        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            name,
            username,
            avatar
        });

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, process.env.JWT_SECRET, {expiresIn: "11h"});

        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});

        console.log(error);
    }
})

const signin = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    try {
        const oldUser = await(await User.findOne({email}))


        if (! oldUser) 
            return res.status(404).json({message: "User doesn't exist"});
        


        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (! isPasswordCorrect) 
            return res.status(400).json({message: "Invalid credentials"});
        


        const token = jwt.sign({
            email: oldUser.email,
            id: oldUser._id
        }, process.env.JWT_SECRET, {expiresIn: "11h"});

        res.status(200).json({result: oldUser, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }


})


export {
    signin,
    signup
};
