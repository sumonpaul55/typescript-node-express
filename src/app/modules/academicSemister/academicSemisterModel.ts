import { academicSemisterCode, academicSemisterName, Months } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemisterInterFace";
import { model, Schema } from "mongoose";

export const academicSemisterSchema = new Schema<TAcademicSemister>(
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

// check semister year and name using pre and post hook middleware
academicSemisterSchema.pre("save", async function (next) {
  //we should use normal function here
  const isSemisterExist = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExist) {
    throw new Error("Semister is already Exist with this year");
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>("AcademicSemister", academicSemisterSchema);
