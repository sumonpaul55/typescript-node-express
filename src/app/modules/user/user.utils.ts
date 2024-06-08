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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

//  generate studennt id //year, semister code and 4 digit number
export const generateStudentId = async (payLoad: TAcademicSemister) => {
  // current number
  const currentNumber = Number(await findLastStudentId()) || 0;
  const increamentId = Number(currentNumber + 1)
    .toString()
    .padStart(4, "0");
  const studentId = `${payLoad.year}${payLoad.code}${increamentId}`;
  return studentId;
};
