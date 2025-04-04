import express from 'express';
const router = express.Router();
import {
  createTransportEntry,
  getAllAgencyTransports,
} from '../controllers/TransportEntry.js';

// POST /api/agency/submit
router.post('/submit', createTransportEntry);


export default router;
