import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import mainRoutes from './mainRoutes.js'
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


const app = express()

app.use(cors())

app.use(express.json())
if (!MONGO_URI) {
    console.log("MongoDB connection string is missing")
    process.exit(1)
}

app.get('/', (req, res) => {
    res.send(' Hi from server.')
})


app.use('/api', mainRoutes)




mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`Connected to MongoDB at ${MONGO_URI}`)


    })
    .catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

