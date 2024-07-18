import User from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js"
import { encrypt } from "../utils/validator.js"
import bcrypt from "bcryptjs"


export const login = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({username})
        const isTruePassword = await bcrypt.compare(password, user?.password || '')

        if(!user || !isTruePassword){
            return res.status(400).send({error: 'Invalid username or password'})
        }

        generateToken(user._id, res)

        res.status(200).send({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    }catch(error){
        console.log('Error to login', error.message)
        res.status(500).send({error: 'Internal server error'})
    }
}

export const register = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body
        
        if(password !== confirmPassword){
            return res.status(400).send({error: 'Password dont match'})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).send({error: 'Username already exists'})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const hashedPassword = await encrypt(password);


        const newUser = new User ({fullName, username, password: hashedPassword, gender, profilePic : gender === 'male' ? boyProfilePic : girlProfilePic})

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save()

            res.status(200).send({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).send({error: 'Invalid data'})
        }
        
    } catch(error){
        console.log('Error in register', error.message)
        res.status(500).send({error: 'Error to register this user'})
    } 
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).send({message: 'Logged out successfully'})
        
    }catch(error){
        console.log('Error to logout', error.message)
        res.status(500).send({error: 'Internal server error'})
    }
}