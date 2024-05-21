// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface INofication extends Document {
  title: string;
  message: string;
  type: "email" | "push" | "sms";
  status: "pending" | "sent";
  users: ObjectId[];
  attachment_url?: string[];
}

const CommunitySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    profilePicture: {
      type: String,
    },
    banner: {
      type: String,
    },
    rules: {
      type: [String],
      default: [],
    },
    topics: {
      type: [String],
      default: [],
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

const Community = mongoose.model<INofication>("Community", CommunitySchema);
export { Community };
