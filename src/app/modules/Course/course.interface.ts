import { Types } from "mongoose";

export type TPreRequisitsCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
  _id: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisitsCourses: [TPreRequisitsCourses];
  isDeleted: boolean;
};
