import { Schema, model, connect } from 'mongoose';

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
   name:{
    firstName: string;
    middleName: string;
    lastName: string
   },
   gender: "male" | "female";
   dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergancyContactNo: string;
    bloodGroup?:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permenentAdress: string;
    guardian: Guardian;
    }