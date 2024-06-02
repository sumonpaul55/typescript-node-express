import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";

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

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message: err.message || message,
    error: err,
  });
});

export default app;
