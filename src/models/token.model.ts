// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  userId: string;
  accessToken: string;
  refreshToken: string;
  otp: string;
}

const tokenSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accessToken: { type: String },
    refreshToken: { type: String },
    otp: { type: String },
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

const Token = mongoose.model<IToken>("Token", tokenSchema);

export { Token };
