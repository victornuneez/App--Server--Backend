import express from 'express';
import { connectDB } from './config.js'
import linksRoutes from './routes/linksRoutes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
connectDB();

// MIDDLEWARES permite al servidor entender y traducir los archivos json y los datos de un formulario.
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/links', linksRoutes)

app.listen(3000, () => {
    console.log('Server run on http://localhost:3000')
})