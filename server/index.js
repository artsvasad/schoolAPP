import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mainRoutes from './mainRoutes.js'
import dbConnection from './config/db.js'
const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use(async (req, res, next) => {
    try {
        await dbConnection()
        next()
    } catch (error) {
        console.error("DB Connec tion Error in Middleware:", error)
        res.status(500).json({ error: "Database connection failed" })

    }
})

app.get('/', (req, res) => {
    res.send(' Hi from server.')
})
app.get('/api/ping', (req, res) => {
    res.status(200).json({
        message: 'pong',
        time: new Date().toISOString()
    })
})
app.use('/api', mainRoutes)

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
export default app

