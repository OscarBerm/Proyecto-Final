import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' })
    }
    const extractedToken = token.split(' ')[1]
    const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET)
    req.user = decodedToken.email
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { verifyToken }