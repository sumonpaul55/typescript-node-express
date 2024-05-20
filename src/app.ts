import express, { Application, Request, Response } from "express"
import cors from 'cors'

const app:Application = express();
// user cors
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Hello mongoose wolrd");
})

export default app;