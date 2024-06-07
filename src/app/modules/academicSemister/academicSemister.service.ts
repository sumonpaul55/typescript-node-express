import { academicSemisterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemisterInterFace";
import { AcademicSemister } from "./academicSemisterModel";

const createAcademicSemisterDb = async (payLoad: TAcademicSemister) => {
  // semister name ------> semister ocde

  // check the semister name to code
  if (academicSemisterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error("Does not matching with semister name and code");
  }
  const result = await AcademicSemister.create(payLoad);
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemisterDb,
};

// validation check
// shoudn't create same samister in the sam year
