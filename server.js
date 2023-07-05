import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import cors from "cors";
import productRoute from "./routes/productRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import Razorpay from "razorpay";
import path from "path";
import { fileURLToPath } from "url";

// rest object
const app = express();
// congigure env
dotenv.config();
// databse
connectDB();
// port
const PORT = process.env.PORT || 8080;

// path in es-6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoute);
app.use("/api", paymentRoute);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

//run listen
app.listen(PORT, () => {
  console.log(
    "server running on ".bgCyan.bold +
      process.env.DEV_MODE.bgBlue.bold +
      " mode on: " +
      PORT.bgCyan.white
  );
});
