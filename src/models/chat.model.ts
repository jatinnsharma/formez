// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IChat extends Document {
  senderId: ObjectId;
  reciverId: ObjectId;
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
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reciverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: { type: String },
    replyTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    attachment_url: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
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
