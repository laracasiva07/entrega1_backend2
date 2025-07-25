// src/routes/purchase.router.js
import { Router } from "express";
import passport from "passport";
import { authorizePurchase } from "../middlewares/authorizePurchase.js";
import { buy } from "../controllers/purchase.controller.js";

const router = Router();

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizePurchase,
  buy
);

export default router;
