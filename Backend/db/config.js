import pg from 'pg'
import 'dotenv/config'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
    allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Error connecting to DB', err)
    } else {
        console.log('DB-Connected', res.rows[0])
    }
})

export default pool

