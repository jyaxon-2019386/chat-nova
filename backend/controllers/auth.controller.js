import User from "../models/user.model.js"
import { encrypt } from "../utils/validator.js"

export const login = async (req, res) => {
    
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

        await newUser.save()

        res.status(200).send({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
    } catch(error){
        console.log('Error in register', error.message)
        res.status(500).send({error: 'Error to register this user'})
    } 
}

export const logout = (req, res) => {
    console.log('LogoutUser')
}