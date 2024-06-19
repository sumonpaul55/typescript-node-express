import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemister } from "../academicSemister/academicSemisterModel";
import { TSemisterRagistration } from "./semisterRagistration.interface";
import { SemisterRegistration } from "./semisterRagistration.model";

const createSemisterRagisTrationIntoDb = async (payLoad: TSemisterRagistration) => {
  // check semister already registered or not
  const isSemisterRegistrationExist = await SemisterRegistration.findOne({ academicSemister: payLoad.academicSemister });
  if (isSemisterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, "This Semister Already Registered");
  }
  // check if the semister is exist
  const isAcademicSemisteExsist = await AcademicSemister.findById(payLoad.academicSemister);
  if (!isAcademicSemisteExsist) {
    throw new AppError(httpStatus.NOT_FOUND, "This AcademicSemister not found");
  }
  // create semister
  const result = await SemisterRegistration.create(payLoad);
  return result;
};

export const semisterRagistrationService = {
  createSemisterRagisTrationIntoDb,
};
