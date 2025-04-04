import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/auth.js';
import issueRoute from './routes/issue.js';
import organizationRoute from './routes/organization.js';
import issueSolvedRoute from './routes/issuesolved.js';
import rankingRoute from './routes/userrank.js';
import organizationRankRoute from './routes/organizationrank.js';

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));;
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/greencity_project";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
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


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));