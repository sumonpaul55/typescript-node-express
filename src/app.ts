import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";
import notFound from "./app/middleWare/notFound";
import router from "./app/route";

const app: Application = express();
// user cors
app.use(cors());
app.use(express.json());

// application route
app.use("/api/v1", router);

// global error handler
app.use(globalErrorHandler);

app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello mongoose wolrd");
});

export default app;
