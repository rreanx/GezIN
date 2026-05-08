import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gezinGuideRouter from "./gezin/guide";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gezinGuideRouter);

export default router;