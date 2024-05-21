// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface Community extends Document {
  ownerId: ObjectId;
  name?: string;
  description?: string;
  members?: ObjectId[];
  profilePicture?: string;
  banner?: string;
  rule?: string[];
  topics?: string[];
  resources?: string;
  isDeleted?: boolean;
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

const Community = mongoose.model<Community>("Community", CommunitySchema);
export { Community };
