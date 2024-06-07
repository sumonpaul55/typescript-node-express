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

const getAcademicSemisterDB = async () => {
  return await AcademicSemister.find();
};

// get academic semister by id
const getSemisterById = async (id: string) => {
  // console.log(id);
  const result = await AcademicSemister.findById(id);
  return result;
};
// update the academic semister data
const updateOneSemister = async (id: string, payLoad: TAcademicSemister) => {
  const filter = { _id: id };
  const updateDocs = payLoad;
  const updatedData = await AcademicSemister.findOneAndUpdate(filter, updateDocs, {
    new: true,
  });
  return updatedData;
};
export const AcademicSemisterService = {
  createAcademicSemisterDb,
  getAcademicSemisterDB,
  getSemisterById,
  updateOneSemister,
};

// validation check
// shoudn't create same samister in the sam year
