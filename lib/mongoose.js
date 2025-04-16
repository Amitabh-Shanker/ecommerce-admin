import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    // Already connected — return the existing connection
    return mongoose.connection;
  } else {
    const uri = process.env.MONGODB_URI;
    return await mongoose.connect(uri);
  }
}
