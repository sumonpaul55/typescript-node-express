import QueryBuilder from "../../builder/QueryBuilder";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentDb = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAcademicDepartmentDb = async (query: Record<string, unknown>) => {
  const getAcademiDepartment = new QueryBuilder(AcademicDepartment.find().populate("academicFaculty"), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await getAcademiDepartment.modelQuery;
  return result;
};
// get single academic department
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate("academicFaculty");
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
