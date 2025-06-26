import express from "express";
const server = express();

import "dotenv/config";
import "./auth/passport.js";
import cors from "cors";

import routes from "./routes/index";
import config from "./config/config";

//---- MIDDLEWARE FUNCTIONS ----
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//secure later*****
server.use(cors());

//---- ROUTES ----
server.use("/users", routes.users);
server.use("/auth", routes.auth);
server.use("/protected", routes.protectedRouter);

//---- SERVER ----
server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server online on ${config.port}`);
});
