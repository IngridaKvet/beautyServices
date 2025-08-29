import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.mjs";
import exampleRouter from "./routes/exampleRoutes.mjs";
import procedureRouter from "./routes/procedureRoutes.mjs";
import ratingRouter from "./routes/ratingRoutes.mjs";
import datesRouter from "./routes/datesRoutes.mjs";
import registrationRouter from "./routes/registrationRoutes.mjs";

import cors from "cors";

const app = express();

//CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow credentials (cookies)
  })
);

//parsers
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/example", exampleRouter);
app.use("/api/v1/procedures", procedureRouter);
app.use("/api/v1/rating", ratingRouter);
app.use("/api/v1/dates", datesRouter);
app.use("/api/v1/registration", registrationRouter);

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    status = "error",
    message = "Internal server error",
  } = err;

  res.status(statusCode).json({
    status: status,
    message: message,
  });
});

export default app;
