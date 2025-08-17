import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { router } from './routes/user.routes.js'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json())
app.use(router);

app.listen(PORT, console.log(`Server on http://localhost:${PORT}`))