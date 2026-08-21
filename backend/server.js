import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
//import registerUser from './controllers/authController.js'
import authRouter from './routers/authRouter.js'
import productRouter from './routers/productRouter.js'

const app = express()

dotenv.config();

app.use(cors());
 
app.use(express.json())

connectDB()

app.use('/api/user', authRouter)

app.use('/api/products', productRouter)

//POST route for registration

//app.post('/api/register' , registerUser)

app.get('/', (req, res) => {
    res.send('API is running..')
})

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});