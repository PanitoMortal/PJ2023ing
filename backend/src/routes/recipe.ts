import { Router } from 'express';
import { getUser } from '../controllers/userInfo';
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getUser);

export default router;