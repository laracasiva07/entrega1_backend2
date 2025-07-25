import { Router } from 'express';
import passport from 'passport';
import { purchaseCart } from '../controllers/cart.controller.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRole(['user']),
  purchaseCart
);

export default router;

