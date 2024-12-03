import { Router } from "express";

import addData from "../controllers/seed_data.js";

const router = Router();

router.route("/seeddata").get(addData);

export default router;
