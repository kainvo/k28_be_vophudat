import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import { userRoutes } from './routes/userRoutes.js';
import { movieRoutes } from './routes/movieRoutes.js';

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/movies', movieRoutes)

mongoose.connect(process.env.DB_URI, { dbName: 'demo_db' })
  .then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log(err);
  });