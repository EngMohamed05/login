import mongoose from "mongoose";
import { z } from "zod";
import bcrypt from "mongoose-bcrypt";

// Define Zod schema for runtime validation
const userValidationSchema = z.object({
  user: z.string().min(1, "username is required"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "password must be at least 6 characters"),
});

// Infer TypeScript type from the Zod schema
type IUser = z.infer<typeof userValidationSchema>;

// Define Mongoose schema for MongoDB persistence
const userMongooseSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
});
userMongooseSchema.plugin(bcrypt);
// Create a Mongoose model with combined type information
const UserModel = mongoose.model<IUser & mongoose.Document>(
  "User",
  userMongooseSchema
);

// Function to validate input and create a new user document
const createUser = async function (input: unknown) {
  const result = userValidationSchema.safeParse(input);
  if (!result.success) {
    console.log(`Validation errors: ${result.error.format()}`);
    throw new Error("Validation failed");
  }
  const newUser = new UserModel(result.data);
  return await newUser.save();
};

export { UserModel, createUser };
