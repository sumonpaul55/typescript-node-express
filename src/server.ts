import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // app.listen(config.port, () => {
    //     console.log(`Example app listening on port ${config.port}`)
    // })
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`${error}`);
  }
}
main();

// unhandled rejection process stop

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//uncought rejection
process.on("uncaughtException", () => {
  process.exit(1);
});
