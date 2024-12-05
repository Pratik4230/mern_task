import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
  })
);

import seeddata from "./src/routes/seed_data.js";
import transactions from "./src/routes/transactions.js";

app.use("/product", seeddata);
app.use("/transactions", transactions);

export default app;
