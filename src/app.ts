import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";

const app: Application = express();
// user cors
app.use(cors());
app.use(express.json());

// application route
app.use("/api/v1/students", StudentRoute);
app.use("/api/v1/users", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello mongoose wolrd");
});

app.use(globalErrorHandler);

export default app;
