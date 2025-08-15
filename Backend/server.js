import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json())


app.listen(PORT, console.log(`Server on http://localhost:${PORT}`))