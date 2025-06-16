import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://zarakkhan23630:fpzc8MvA07XcWtXa@cluster0.clstlao.mongodb.net/chatapp?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`Database Connected ${connection.connection.host}`);
  } catch (error) {
    console.log("Database connection Failed",error);
    process.exit(1);
  }
};

