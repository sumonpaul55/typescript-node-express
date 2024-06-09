import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentDb = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAcademicDepartmentDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
// get single academic department
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentDb = async (id: string, payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentDb,
  getAcademicDepartmentDb,
  updateAcademicDepartmentDb,
  getSingleAcademicDepartment,
};
