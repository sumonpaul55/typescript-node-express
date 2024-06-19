import { model, Schema } from "mongoose";
import { TSemisterRagistration } from "./semisterRagistration.interface";
import { semisterRegistrationStatus } from "./semisterRegistration.constatnt";

const semisterRegistrationSchema = new Schema<TSemisterRagistration>(
  {
    academicSemister: {
      type: Schema.Types.ObjectId,
      unique: true,
      tequired: true,
      ref: "AcademicSemister",
    },
    status: {
      type: String,
      enum: semisterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCreadit: { type: Number, required: true, default: 3 },
    maxCreadit: { type: Number, required: true, default: 15 },
  },
  {
    timestamps: true,
  }
);

export const SemisterRegistration = model<TSemisterRagistration>("SemisterRegistration", semisterRegistrationSchema);
