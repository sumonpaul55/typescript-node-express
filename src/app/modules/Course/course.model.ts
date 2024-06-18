import mongoose, { model, Schema } from "mongoose";
import { TCourse, TPreRequisitsCourses } from "./course.interface";

const TPreRequisitsCourseSchema = new Schema<TPreRequisitsCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
  _id: Boolean,
});

const CourseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true, trim: true },
  preRequisitsCourses: [TPreRequisitsCourseSchema],
  isDeleted: { type: Boolean, default: false },
});

export const Course = model<TCourse>("Course", CourseSchema);
