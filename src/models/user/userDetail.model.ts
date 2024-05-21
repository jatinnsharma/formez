// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { Gender } from "../../utils/constants.util";

export interface IUserDetail extends Document {
  username?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phoneNumber?: string;
  dob?: string;
  gender?: string;
  avatar?: string;
}

const UserDetailSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.OTHER,
    },
    avatar: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  },
);

const UserDetail = mongoose.model<IUserDetail>("UserDetail", UserDetailSchema);
export { UserDetail };
