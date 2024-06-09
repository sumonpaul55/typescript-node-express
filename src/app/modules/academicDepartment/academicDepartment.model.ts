import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

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
export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academiDepartmentSchema);
