import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  organizationId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  issuesolved:{
    type: Number,
    default: 0
  }
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization