import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String, required: true }], // list of candidate emails
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Job = mongoose.model('Job', jobSchema);
  export default Job;
  