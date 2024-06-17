import { Types } from "mongoose";

export type TPreRequisitsCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
  ref: string;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisitsCourses: [];
};
