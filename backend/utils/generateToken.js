import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: '5h'
    })

    res.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })
}

