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
			minlength: [6, "Password must be at least 6 characters"],
		},

		phone: {
			type: string,
			trim: true,
			required: [true, "Phone number is required"],
			match: [/^\d{10}$/, "Phone number must be a 10-digit number."],
		},

		IsVerified: Boolean,

		guestId: {
			type: String,
			required: true,
			trim: true,
			match: [/^\d{12}$/, "Enter valid id!"],
		},

		employeeId: {
			type: String,
			required: true,
		},

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
