import mongoose, { Document, ObjectId, Schema } from "mongoose";

const personSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    webPage: { type: String, default: null },
    company: { type: String, default: null },
    title: { type: String, default: null },
    // tags: { type: String, enum: [...Object.values(TAGS)] },
    // tags: { type: String },
    tags: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tags",
        },
      ],
      default: undefined,
    },
    notes: { type: String },
    image: { type: String, default: null },
    custom: { type: String, default: null },
    linkedin: { type: String, default: null },
    officePhone: { type: [String], default: undefined },
    timeline: { type: String },
    impFields: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  },
  {
    timestamps: true,
  },
);

const Person = mongoose.model("persons", personSchema);

export { Person };
