import mongoose, { model, Schema } from "mongoose";
import { TCourse, TPreRequisitsCourses } from "./course.interface";

const TPreRequisitsCourseSchema = new Schema<TPreRequisitsCourses>({
  course: Schema.Types.ObjectId,
  isDeleted: { type: Boolean, default: false },
});

const CourseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, required: true },
  creadits: { type: Number, required: true, trim: true },
  preRequisits: [TPreRequisitsCourseSchema],
});

export const Course = model<TCourse>("Course", CourseSchema);
