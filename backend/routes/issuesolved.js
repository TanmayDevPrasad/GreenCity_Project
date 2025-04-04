import express from 'express';
import { markIssueAsSolved } from '../controllers/issuesolved.js';

const router = express.Router();

router.post('/solve', markIssueAsSolved);

export default router;
// This code defines an Express router for handling requests related to marking issues as solved.