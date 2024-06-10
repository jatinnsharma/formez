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
    tttle: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
    },
    type: {
      type: String,
      // enums
    },
    status: {
      type: String, // enums
    },
    users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    attachment_url: {
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
