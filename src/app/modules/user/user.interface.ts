import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(plaingTextPassword: string, hashPassword: string): Promise<TUser>;

  isJWTissuedBeforPasswordChanged(passwordChangedTimestamp: Date, jwtissuedTimeStamp: number): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
