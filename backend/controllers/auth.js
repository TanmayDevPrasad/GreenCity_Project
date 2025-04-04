import User from '../models/auth.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    try{
        const {firstName, lastName, username, email, password } = req.body;
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName : firstName,
            lastName : lastName,
            username : username,
            email : email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: {
            _id : newUser._id,
            username: newUser.username,
            email: newUser.email
        }});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try{
        const{email, password} = req.body;
        const user = await User.findOne({ email });
        const validPass = await bcrypt.compare(password, user.password);
        if(!user || !validPass){
            return res.status(400).json({ error: "Invalid credentials" });  
        }
        res.status(200).json({ message: "Login successful", user: {
            _id : user._id,
            username: user.username,
            email: user.email
        }});
    }
    catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
};