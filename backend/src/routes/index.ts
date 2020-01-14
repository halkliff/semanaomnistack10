import { Router } from 'express';
import DevsRoute from './devs.route';

const router = Router();

router.use(DevsRoute);

export default router;
