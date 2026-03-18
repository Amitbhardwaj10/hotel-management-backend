import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	}),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRouter from "../src/routes/auth.route.js";
import userRouter from "../src/routes/user.route.js";
import roomRouter from "../src/routes/room.route.js";
import { User } from "./models/user.model.js";

// routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/rooms", roomRouter);

export default app;
