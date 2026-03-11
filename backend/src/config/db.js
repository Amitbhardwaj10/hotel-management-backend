import mongoose from "mongoose";

const DB_NAME = "hotelManagement";

const connectDb = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`,
		);

		console.log(
			`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`,
		);
	} catch (error) {
		console.error("DB connection error: ", err);
		process.exit(1);
	}
};

export default connectDb;
