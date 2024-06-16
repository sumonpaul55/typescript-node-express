import { Types } from "mongoose";

export type TPreRequisitsCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  creadits: number;
  preRequisits: [];
};
