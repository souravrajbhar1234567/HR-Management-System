import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected`);
    console.log(`📦 Database: ${connection.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    if (
      error.message.includes("whitelist") ||
      error.message.includes("servers in your MongoDB Atlas cluster")
    ) {
      console.error(
        "\n👉 Tip: Add your current IP address (or 0.0.0.0/0) to MongoDB Atlas -> Network Access:\nhttps://cloud.mongodb.com/ -> Network Access -> Add IP Address\n"
      );
    }

    process.exit(1);
  }
};

export default connectDB;