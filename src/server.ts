import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");

    const port = config.port || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
