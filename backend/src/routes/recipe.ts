import { Router } from 'express';
import { getUser } from '../controllers/userInfo';
import validateToken from './validate-token';
import { getViewRecipe } from '../controllers/ViewRecipes';

const router = Router();

router.get('/', validateToken/* , getUser */);
router.get('/ViewRecipe', getViewRecipe);
router.get('/ViewUser', getUser);
export default router;