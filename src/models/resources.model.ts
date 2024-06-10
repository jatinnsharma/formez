// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IChat extends Document {
  userId: ObjectId;
  reciverId?: string;
  message?: string;
  attachment_url?: string[]; // images , videos , voice message
  status: "sent" | "delivered" | "read";
  reactions?: {
    [emoji: string]: ObjectId[];
  };
  replyTo?: ObjectId; // ID of the message this message is replying to (for threading)
  isDeleted?: boolean;
  thread?: IChat[];
}

const CommentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reciverId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    message: {
      type: String,
    },
    attachment_url: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      // enums
      // default: 0,
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

const Comment = mongoose.model<IChat>("Comment", CommentSchema);
export { Comment };
