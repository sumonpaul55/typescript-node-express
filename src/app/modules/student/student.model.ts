import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
    firstName:{
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName:{
        type: String,
        required: true
    }
})

const guardianSchema = new Schema<Guardian>({
    fatherName:{
        type: String,
        required: true
    },
    fatherOccupation:{
        type: String,
        required: true
    },
    fatherContactNo:{
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true
    },
    motherOccupation:{
        type: String,
        required: true
    },
    motherContactNo:{
        type: String,
        required: true
    }
})

const localGuardianSchema= new Schema<LocalGuardian>({
    name: {
        type:String,
        required: true
    },
    occupation: {
        type:String,
        required: true
    },
    contactNo: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
})

const studenSchema = new Schema<Student>({
    id: {type: String},
    name: userNameSchema,
    gender: ["male", "female"],
    dateOfBirth: String,
    email: {
        type: String,
        requierd: true,
    },
    contactNumber: {type: String, required: true},
    emergancyContactNo:{type: String, required: true},
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: {
        type: String,
        requierd: true,
    },
    permenentAdress:{
        type: String,
        requierd: true,
    },
    guardian:guardianSchema,
    localGuardian:localGuardianSchema,
    profileImage: {type: String},
    isActive:["active", "block"]
})

// creating a model
export const StudentSchema = model<Student>("Student", studenSchema)
