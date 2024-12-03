import express from "express";

const app = express();

app.use(express.json());

import seeddata from "./src/routes/seed_data.js";
import transactions from "./src/routes/transactions.js";

app.use("/product", seeddata);
app.use("/transactions", transactions);

export default app;
