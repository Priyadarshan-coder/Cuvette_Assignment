import mongoose from "mongoose";
const emailLogSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    recipientEmails: [{ type: String, required: true }],
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
});

const EmailLog= mongoose.model('EmailLog', emailLogSchema);
export default EmailLog;
