import QueryBuilder from "../../builder/QueryBuilder";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyDb = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);
  return result;
};

const getAcademicFacultiesFromDb = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(AcademicFaculty.find(), query).search(["name"]).filter().sort().paginate().fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFaculty = async (id: string, data: Partial<TAcademicFaculty>) => {
  const result = AcademicFaculty.findOneAndUpdate({ _id: id }, data, { new: true });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyDb,
  getAcademicFacultiesFromDb,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
