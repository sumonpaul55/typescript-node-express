import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";
import notFound from "./app/middleWare/notFound";
import router from "./app/routes/index";

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
