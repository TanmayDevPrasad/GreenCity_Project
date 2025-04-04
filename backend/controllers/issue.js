import Issue from '../models/Issue.js';
import User from '../models/auth.js';

function generateIssueCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // ensures 6-digit code
  }
// Function to check if the issue code is unique  

export const reportIssue = async (req, res) => {
    try {
      const { username, title, description, location, image } = req.body;
  
      if (!username || !title || !description || !location || !image) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const user = await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Generate unique 6-digit code
      let issueCode;
      let isUnique = false;
      while (!isUnique) {
        issueCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existing = await Issue.findOne({ issueCode });
        if (!existing) isUnique = true;
      }
  
      const newIssue = new Issue({
        username: user._id,
        title,
        description,
        location,
        image,
        issueCode: issueCode
      });
  
      await newIssue.save();
  
      await User.findByIdAndUpdate(user._id, { $inc: { issuecount: 1 } });
  
      res.status(201).json({
        message: "Issue reported successfully",
        issue: {
          _id: newIssue._id,
          username: username,
          title: newIssue.title,
          description: newIssue.description,
          location: newIssue.location,
          image: newIssue.image,
          issueCode: newIssue.issueCode
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  