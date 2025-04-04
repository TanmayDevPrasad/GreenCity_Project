import express from 'express';
import { reportIssue } from '../controllers/issue.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Report an issue
router.post('/issue', reportIssue);


export default router;