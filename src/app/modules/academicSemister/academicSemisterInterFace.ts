export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TacademicSemisterName = "Autumn" | "Summer" | "Fall";
export type TacademicSemisterCode = "01" | "02" | "03";

export type TAcademicSemister = {
  name: TacademicSemisterName;
  year: string;
  code: TacademicSemisterCode;
  startMonth: TMonths;
  endMonth: TMonths;
};
