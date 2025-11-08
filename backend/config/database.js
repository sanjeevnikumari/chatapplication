// 
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // exit process if DB connection fails
  }
};

export default connectDB;
