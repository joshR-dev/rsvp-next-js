//IMPORT MONGOOSE
import mongoose from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;

// connection function
const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		return true;
	}

	try {
		await mongoose.connect(DATABASE_URL || "");

		console.log("Connected to database");

		return true;
	} catch (error) {
		console.log("error connecting to database", error);
	}
};

export default connectDB;
