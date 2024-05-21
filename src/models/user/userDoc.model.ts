// src/models/User.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUserDoc extends Document {
  userId: ObjectId;
  aadharCardNumber?: number;
  panCardNumber?: string;
  bankDetails?: object;
  secondaryEducation?: string;
  higherSecondaryEducation?: string;
  graduateDegree?: string;
  postgraduateDegree?: string;
  additionalEducationQualification?: string;
}

const UserDocSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    aadharCardNumber: {
      type: Number,
    },
    panCardNumber: {
      type: String,
    },
    bankDetails: {
      accountNumber: String,
      accountHolderName: String,
      bankName: String,
      branch: String,
      IFSCCode: String,
    },
    secondaryEducation: {
      type: String,
    },
    higherSecondaryEducation: {
      type: String,
    },
    graduateDegree: {
      type: String,
    },
    postgraduateDegree: {
      type: String,
    },
    additionalEducationQualification: {
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

const UserDoc = mongoose.model<IUserDoc>("UserDoc", UserDocSchema);
export { UserDoc };
