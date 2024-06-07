import { TAcademicSemister } from "./academicSemisterInterFace";
import { AcademicSemister } from "./academicSemisterModel";

const createAcademicSemisterDb = async (payLoad: TAcademicSemister) => {
  const result = await AcademicSemister.create(payLoad);
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemisterDb,
};

// validation check
// shoudn't create same samister in the sam year
