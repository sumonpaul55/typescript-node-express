import { academicSemisterCode, academicSemisterName, Months } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemisterInterFace";
import { model, Schema } from "mongoose";

export const AcademicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: academicSemisterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemisterCode,
      required: true,
    },

    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true }
);

export const AcademicSemister = model<TAcademicSemister>("AcademicSemister", AcademicSemisterSchema);
