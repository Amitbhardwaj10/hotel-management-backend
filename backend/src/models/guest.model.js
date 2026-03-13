import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		fullname: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},

		role: {
			type: String,
			enum: ["guest", "staff", "manager", "admin"],
			default: "guest",
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters"],
		},

		phone: {
			type: String,
			trim: true,
			required: [true, "Phone number is required"],
			match: [/^\d{10}$/, "Phone number must be a 10-digit number."],
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		guestId: {
			type: String,
			trim: true,
			match: [/^\d{12}$/, "Enter valid 12-digit guest ID!"],
			required: true,
			unique: true,
		},

		bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true },
);

userSchema.set("toJSON", {
	transform: function (_, ret) {
		delete ret.password;
		delete ret.refreshToken;
		delete ret.role;
		return ret;
	},
});

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
