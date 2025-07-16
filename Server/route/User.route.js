import express from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User route is working!');
});
// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

export default router;
