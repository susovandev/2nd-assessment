import { Router } from 'express';

import dashboardRoutes from './dashboard/dashboard.routes.js';
import productRoutes from './products/product.routes.js';
import categoryRoutes from './category/category.routes.js';

const router = Router();

router.use('/dashboard', dashboardRoutes)
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

export default router;
