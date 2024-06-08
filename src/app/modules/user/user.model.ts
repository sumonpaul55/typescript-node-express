import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// pre save middlewar will work for
userSchema.pre("save", async function (next) {
  // hasing password to save into db
  const users = this; // refer the document
  users.password = await bcrypt.hash(users.password, Number(config.BCRYPT_SALTROUND));
  next();
});
// post save middlewar/hooks
userSchema.post("save", function (doc, next) {
  // after the save
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
