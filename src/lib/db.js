import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    console.log(`Database Connected ${connection.connection.host}`);
  } catch (error) {
    console.log("Database connection Failed",error);
    process.exit(1);
  }
};

