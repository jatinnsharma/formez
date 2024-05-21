// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUserAddress extends Document {
  userId: ObjectId;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

const UserAddressSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    streetName: {
      type: String,
    },
    streetNumber: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postcode: {
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

const UserAddress = mongoose.model<IUserAddress>(
  "UserAddress",
  UserAddressSchema,
);
export { UserAddress };
