import express from 'express';
const router = express.Router();
import {
  createTransportEntry,
  getAllAgencyTransports,
} from '../controllers/TransportEntry.js';

// POST /api/agency/submit
router.post('/submit', createTransportEntry);

// GET all transport entries
router.get('/all', getAllAgencyTransports);

export default router;
