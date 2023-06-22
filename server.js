import  express  from "express";
import dotenv from "dotenv";
import colors from 'colors';
import morgan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors';

// rest object
const app = express()
// congigure env
dotenv.config();
// databse 
connectDB();
// port
const PORT = process.env.PORT || 8080;
// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req, res) => {
  res.send("<h1>HEllo</h1>")
})

//run listen 
app.listen(PORT, () => {
  console.log('server running on '.bgCyan.bold + process.env.DEV_MODE .bgBlue.bold + " mode on: " + PORT .bgCyan.white);
})