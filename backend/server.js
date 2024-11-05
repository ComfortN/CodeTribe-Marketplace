import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/database.js"
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';


const app = express();
const PORT = process.env.PORT || 8080

connectDB()
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);




app.listen(PORT, () => console.log(`Server started on port ${PORT}`))