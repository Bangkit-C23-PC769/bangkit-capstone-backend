import Users from "../models/UserModel.js"
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

class UserController {
    static async getUser(req, res) {
        const userId  = req.userId
        try {
            const user = await Users.findOne({
                attributes: ['id','fullname', 'username', 'email'],
                where: {id: userId}
            })
            res.json({
                success: true,
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async register(req, res) {
        const { fullname, username, email, password, confirmPasssword } = req.body;
        
        const user = await Users.findOne({
            attributes: ["id", "fullname", "username", "email"],
            where: { email }
        })

        if(user !== null) return res.status(400).json({
            message: "User email already exist"
        }) 

        if(password !== confirmPasssword) return res.status(400).json({
            message: "Password not match"
        })

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        

        try {
            const newUser = await Users.create({
                fullname, username, email, password: hashPassword
            })

            res.json({
                success: true,
                message: "Registered Successfully",
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await Users.findOne({
                where: {
                    [Op.or]: [{email: username}, {username}]
                }
            })

            if(user == null) return res.status(400).json({
                message: "User not found."
            })
        
            const match = await bcrypt.compare(password, user.password)

            if(!match) return res.status(400).json({
                message: "Wrong Password."
            })
            
            const accessToken = jwt.sign({
                userId: user.id,
                username: user.username,
                email: user.email,
            }, process.env.ACCESS_TOKEN)

            const refreshToken = jwt.sign({
                userId: user.id,
                username: user.username,
                email: user.email,
            }, process.env.REFRESH_TOKEN)


            await Users.update({refreshToken}, {
                where: {
                    id: user.id
                }
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            res.json({
                success: true,
                message: "Login Successfully",
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(404).json({
                message: "User not found."
            })
        }
    }

    static async logout(req, res) {
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken) return res.sendStatus(204)

        const user = await Users.findOne({where: {refreshToken}})

        if(user === null ) return res.sendStatus(204) 

        await Users.update({
            refreshToken: null
        }, {
            where: {
                id: user.id
            }
        })

        res.clearCookie('refreshToken')

        return res.sendStatus(200)
    }
}

export default UserController