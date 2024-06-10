import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";

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
  //this next is from mongoose
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error("This Department si Already exist");
  }
  next();
});

// prevent the execution if updated id does not exist in db
academiDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(404, "This department does not exist");
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academiDepartmentSchema);
