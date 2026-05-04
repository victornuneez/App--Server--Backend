import express from 'express';
import { connectDB } from './config.js';
import userRoutes from './routes/userRoutes.js';
import appRoutes from './routes/appRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();

// MIDDLEWARES permite al servidor entender y traducir los archivos json y los datos de un formulario.
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(cors());

app.use('/api', userRoutes);
app.use('/app', appRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server run on http://localhost:${process.env.PORT}`)
})