import express from 'express';
import { signUp, logIn } from '../controllers/AuthController.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

// Public routes
router.post('/signup',upload.none(), signUp);
router.post('/login', upload.none(),logIn);

export default router;