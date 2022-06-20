import express from "express";
import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const thisUser = await User.findOne({username});
        if(!thisUser) return res.status(404).json({ message: "User doesn't exist..." });
        res.status(200).json({ result: thisUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const existUser = await User.findOne({username});
        if(!existUser) return res.status(404).json({ message: "User doesn't exist..." });
        const isPassword = await bcrypt.compare(password, existUser.password);
        if(!isPassword) return res.status(400).json({ message: "Password is wrong?"});

        const token = jwt.sign({ username: existUser.username}, 'replace_with_env', { expiresIn: "1h"});
        res.status(200).json({ result: existUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
        const existUser = await User.findOne({username: user.username});
        if(existUser) return res.status(404).json({ message: "User exists..." });
        const newPass = await bcrypt.hash(user.password, 10);
        const newUser = await User.create( {username: user.username, password: newPass, wpm: 0, raceCount: 0 });
        
        const token = jwt.sign({ username: newUser.username }, 'replace_with_env', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

router.post('/update', async (req, res) => {
    const info = req.body;
    const theuser = info.username;
    const newWPM = info.wpm;
    const newRaceCount = info.raceCount;
    try {
        const updUser = await User.updateOne({ username: theuser }, {
            wpm: newWPM,
            raceCount: newRaceCount
        })
        res.status(201).json({ updUser });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

export default router;