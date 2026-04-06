import express, { json } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js'


dotenv.config();

const app = express()



app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/recommendations',recommendationRoutes);
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    });
})



