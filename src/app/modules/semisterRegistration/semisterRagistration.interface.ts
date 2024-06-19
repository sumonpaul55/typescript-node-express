import { Types } from "mongoose";

export type TSemisterRagistration = {
  academicSemister: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCreadit: number;
  maxCreadit: number;
};
