import { Router } from 'express';
import dashBoardController from '../../../controllers/admin/dashboard/dashboard.controller.js';

const router = Router();

//http://localhost:5555/admin/dashboard
router.get('/', dashBoardController.getDashboard);

export default router;
