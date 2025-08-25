import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/config.js'
import userRoute from './routes/user.routes.js'
import productsRoute from './routes/products.routes.js'

const PORT = process.env.PORT ?? 3000

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    'https://proyecto-final-seven-gamma.vercel.app',
    'https://cafeycuento.netlify.app'
];

app.use(
    cors({
        origin: (origin, callback) => {
            callback(null, true);
        },
        credentials: true
    })
);

app.use(express.json())
app.use(productsRoute)
app.use(userRoute);


app.listen(PORT, console.log(`Server on http://localhost:${PORT}`))

export default app; 