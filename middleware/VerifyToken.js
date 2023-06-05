import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
  
    const token = authHeader && authHeader.split(' ')[1]
  
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if(error) return res.sendStatus(403)
        req.userId = decoded.userId
        req.email = decoded.email
        req.username = decoded.username

        next()
    })
}