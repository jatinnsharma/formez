// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../../utils/constants.util";

export interface IUser extends Document {
  identifier: string;
  username?: string;
  email?: string;
  password: string;
  salt: string;
  role: string;
  isDeleted: boolean;
  isBlocked: boolean;
  isVerified: boolean;
}

// export type IUserOmit = Omit<IUser, "countryCode" | "phoneNumber">;

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    salt: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", UserSchema);

export { User };
