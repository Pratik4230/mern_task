import { Router } from "express";

const router = Router();

import {
  getAllTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
} from "../controllers/transactions.js";

import combinedResponse from "../controllers/combinedResponse.js";

router.route("/feed").get(getAllTransactions);
router.route("/statistics").get(getStatistics);
router.route("/barchart").get(getBarChart);
router.route("/piechart").get(getPieChart);

router.route("/combinedresponse").get(combinedResponse);

export default router;
