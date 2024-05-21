// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IComment extends Document {
  userId: ObjectId;
  postId?: string;
  content?: string[];
  upvotes?: number;
  downvotes?: number;
  isDeleted?: boolean;
  replyTo?: ObjectId;
  replies?: IComment[];
}

const CommentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    content: {
      type: [String],
      default: [],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
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

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export { Comment };
