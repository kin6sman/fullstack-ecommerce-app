import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongoDB ${connection.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`error in mongodb ${error}`.bgRed.white)
  }
}

export default connectDB;