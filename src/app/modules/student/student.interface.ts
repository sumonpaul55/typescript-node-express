import { Schema, model, connect } from 'mongoose';


export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string
}

export type LocalGuardian ={
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export type Guardian ={
        fatherName: string;
        fatherOccupation: string;
        fatherContactNo: string;
        motherName: string;
        motherOccupation: string;
        motherContactNo: string;
    
}

export type Student= {
    id: string;
   name:UserName;
   gender: "male" | "female";
   dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergancyContactNo: string;
    bloodGroup?:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permenentAdress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImage?: string;
    isActive: "active" | "inactive";
    }