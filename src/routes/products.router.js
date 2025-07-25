import passport from 'passport';

import { authorizeRoles } from '../middlewares/authorization.js';

// Solo ADMIN puede crear, actualizar, eliminar productos
router.post('/products', passport.authenticate('jwt', { session: false }), authorizeRoles('ADMIN'), productController.create);
router.put('/products/:id', passport.authenticate('jwt', { session: false }), authorizeRoles('ADMIN'), productController.update);
router.delete('/products/:id', passport.authenticate('jwt', { session: false }), authorizeRoles('ADMIN'), productController.delete);

// Solo USER puede agregar productos a su carrito
router.post('/cart/:cartId/products', passport.authenticate('jwt', { session: false }), authorizeRoles('USER'), cartController.addProduct);

