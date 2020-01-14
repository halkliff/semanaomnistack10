import { Router } from 'express';
import DevController from '../controllers/dev.controller';
import SearchController from '../controllers/search.controller';

const router = Router();

router.post('/devs', DevController.instance.store);
router.get('/devs', DevController.instance.index);

router.get('/search', SearchController.instance.index);

export default router;
