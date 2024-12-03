import { Router } from "express";

const router = Router();

import {
  getAllTransactions,
  getStatistics,
} from "../controllers/transactions.js";

router.route("/feed").get(getAllTransactions);
router.route("/statistics").get(getStatistics);

export default router;
