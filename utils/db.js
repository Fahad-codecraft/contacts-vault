import mongoose from 'mongoose';

const connectDB = async () => {
  if(mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database")
  } catch (error) {
    throw new Error('Unable to connect to database', error);
  }
}

export default connectDB;