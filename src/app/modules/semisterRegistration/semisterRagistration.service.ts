import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemister } from "../academicSemister/academicSemisterModel";
import { TSemisterRagistration } from "./semisterRagistration.interface";
import { SemisterRegistration } from "./semisterRagistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemisterRagisTrationIntoDb = async (payLoad: TSemisterRagistration) => {
  // check if there any registered semiester that is alredy "UPCOMING" | "ONGOING"
  const isAnySemisterUpcomingOrOnging = await SemisterRegistration.findOne({
    $or: [{ status: "UPCOMING" }, { status: "ONGING" }],
  });
  if (isAnySemisterUpcomingOrOnging) {
    throw new AppError(httpStatus.BAD_REQUEST, `There is alredy ${isAnySemisterUpcomingOrOnging.status} Semister Registered`);
  }
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
// get all semister Registration
const getAllSemisterRegistrationFromDb = async (query: Record<string, unknown>) => {
  const semisterquery = new QueryBuilder(SemisterRegistration.find().populate("academicSemister"), query).filter().sort().paginate().fields();
  const result = await semisterquery.modelQuery;
  return result;
};
// get single registration
const getSingleRegistrationFromDb = async (id: string) => {
  const result = await SemisterRegistration.findById(id);
  return result;
};
// update semister registration
const updateSemisterRegistrationDb = async (id: string, payLoad: TSemisterRagistration) => {
  // check if the requested register semister is exist
  const isSemisterRegistrationExist = await SemisterRegistration.findById(id);
  if (!isSemisterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Semister Registration is not found");
  }
  const currentSemisterStatus = isSemisterRegistrationExist?.status;
  const requestedStatus = payLoad?.status;
  // if the requested Semister registration is ended we will not update
  if (currentSemisterStatus === "ENDED") {
    throw new AppError(httpStatus.BAD_REQUEST, `This semister is already ${currentSemisterStatus}`);
  }
  // finally update the semister "UPCOMIG" -> "ONGING" -> "ENDED"
  if (currentSemisterStatus === "UPCOMING" && requestedStatus === "ENDED") {
    throw new AppError(httpStatus.BAD_REQUEST, `You cannot directly change status from ${currentSemisterStatus} to ${requestedStatus}`);
  }
};

export const semisterRagistrationService = {
  createSemisterRagisTrationIntoDb,
  getSingleRegistrationFromDb,
  getAllSemisterRegistrationFromDb,
  updateSemisterRegistrationDb,
};
