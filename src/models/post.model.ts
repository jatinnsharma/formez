// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IPost extends Document {
  userId: ObjectId;
  title?: string;
  attachment_url?: string[];
  content?: string;
  type?: Record<string, any>;
  keywords?: string[];
  upvotes?: number;
  downvotes?: number;
  commentId?: ObjectId;
  isDeleted?: boolean;
}

const PostSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    attachment_url: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
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

const Post = mongoose.model<IPost>("Post", PostSchema);
export { Post };
