import { TMonths, TacademicSemisterName, TacademicSemisterCode, TAcademicSemisterMapper } from "./academicSemisterInterFace";
export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemisterName: TacademicSemisterName[] = ["Autumn", "Summer", "Fall"];
export const academicSemisterCode: TacademicSemisterCode[] = ["01", "02", "03"];

export const academicSemisterNameCodeMapper: TAcademicSemisterMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
