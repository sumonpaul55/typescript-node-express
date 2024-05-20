import { Student } from './student.interface';
import { StudentSchema } from './student.model';


const createStudentDB = async(student:Student)=>{
const result =  await StudentSchema.create(student)
return result
}

export const StrdentServices = {
    createStudentDB,
}