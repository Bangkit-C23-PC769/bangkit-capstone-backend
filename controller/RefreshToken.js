import Users from "../models/UserModel.js"
import jwt from 'jsonwebtoken'

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
     
        if(!refreshToken) return res.sendStatus(401)
        
        const user = await Users.findOne({where:{refreshToken}})

        if(user == null) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, decode) => {
            if(error) return res.sendStatus(403)

            const userId = user.id
            const username = user.username
            const email = user.email
            const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN, {
                expiresIn: '15s'
            })

            res.json({
                accessToken
            })
        })

    } catch (error) {
        console.error(error)
    }
}