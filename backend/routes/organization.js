import express from 'express';
import {signupOrganization, loginOrganization} from '../controllers/organization.js';

const router = express.Router();

router.post('/signup', signupOrganization);
router.post('/login', loginOrganization);

export default router;