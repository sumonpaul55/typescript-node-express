import { TAcademicSemister } from "../academicSemister/academicSemisterInterFace";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

//  generate studennt id //year, semister code and 4 digit number
export const generateStudentId = async (payLoad: TAcademicSemister) => {
  // current number
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(); //2025010001

  const lastSemisterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const curentSemisterCode = payLoad?.code;
  const currentYear = payLoad?.year;
  if (lastStudentId && lastSemisterCode === curentSemisterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6);
  }

  const increamentId = (Number(currentId) + 1).toString().padStart(4, "0");
  const studentId = `${payLoad.year}${payLoad.code}${increamentId}`;
  return studentId;
};