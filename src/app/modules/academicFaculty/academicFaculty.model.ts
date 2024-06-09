import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const AcadmeicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, unique: true, required: [true, "Academic Faculty is Required"] },
});

export const AcademicFaculty = model<TAcademicFaculty>("academicFaculty", AcadmeicFacultySchema);
