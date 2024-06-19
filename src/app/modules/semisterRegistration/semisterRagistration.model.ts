import { model, Schema } from "mongoose";
import { TSemisterRagistration } from "./semisterRagistration.interface";

const semisterRegistrationSchema = new Schema<TSemisterRagistration>({});

export const SemisterRegistration = model<TSemisterRagistration>("SemisterRegistration", semisterRegistrationSchema);
