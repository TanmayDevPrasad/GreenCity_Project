import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import userRoute from './routes/auth.js';
import issueRoute from './routes/issue.js';
import organizationRoute from './routes/organization.js';
import issueSolvedRoute from './routes/issuesolved.js';
import rankingRoute from './routes/userrank.js';
import organizationRankRoute from './routes/organizationrank.js';
import TransportEntryRouter from './routes/TransportEntry.js';
import TransportQuery from './routes/TransportQuery.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

const app = express();

// CORS configuration - allow Vite dev server (port 5173) and production
app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:3000"], 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/greencity_project";
mongoose.connect(URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1);
});
app.use('/user', userRoute);
app.use('/issue', issueRoute);
app.use('/organization', organizationRoute);
app.use('/issuesolved', issueSolvedRoute);
app.use('/userrank', rankingRoute);
app.use('/organizationrank', organizationRankRoute);
app.use('/entry',TransportEntryRouter);
app.use('/query',TransportQuery);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));