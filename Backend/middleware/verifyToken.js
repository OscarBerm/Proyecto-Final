import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' })
    }
    const [bearer, tokenValue] = token.split(' ');
    if(bearer !== 'Bearer' || !tokenValue){
      return res.status(400).json({message: 'Token not valid'});
    }
    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET)
    req.user = decodedToken.email
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { verifyToken }