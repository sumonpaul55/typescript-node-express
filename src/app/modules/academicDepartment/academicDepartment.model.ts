import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { NextFunction } from "express";

const academiDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, unique: true, required: [true, "Academic Department name is required"] },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);
// check data is exist or not using pre middleware
academiDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error("This Department si Already exist");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academiDepartmentSchema);
