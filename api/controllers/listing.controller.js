import nodemailer from 'nodemailer';
import EmailLog from '../models/email_log.model.js';
import Job from '../models/job_posting.model.js';

export const createListing = async (req, res, next) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate, companyemail , userref } = req.body;
console.log(req.body);

  try {
    // Step 1: Create a new job entry in the Job database
    const newJob = await Job.create({
      company: userref, // Assuming userref is the company ID
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      candidates,
      endDate,
      companyemail,
    });

    // Step 2: Set up Nodemailer to send emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use the email service you prefer
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Step 3: Prepare email details
    const subject = `Job Listing: ${jobTitle}`;
    const body = `Dear Candidate,\n\nWe are pleased to inform you about a new job opportunity:\n\nTitle: ${jobTitle}\nDescription: ${jobDescription}\nExperience Level: ${experienceLevel} Year(s)\nEnd Date: ${endDate}\n\nFrom ${companyemail}\n\nBest Regards,\nYour Company Name`;

    // Step 4: Send emails to candidates and log the results
    const emailPromises = candidates.map(async (candidateEmail) => {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to: candidateEmail, // Recipient email
        subject,
        text: body,
      };

      try {
        await transporter.sendMail(mailOptions);

        // Step 5: Log the email in the EmailLog database
        await EmailLog.create({
          company: userref, // Assuming userref is the company ID
          job: newJob._id, // Associate email log with the job
          recipientEmails: [candidateEmail],
          subject,
          body,
          status: 'sent',
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${candidateEmail}:`, emailError);
        
        // Log the failed email in the EmailLog as well
        await EmailLog.create({
          company: userref,
          job: newJob._id,
          recipientEmails: [candidateEmail],
          subject,
          body,
          status: 'failed',
        });
      }
    });

    await Promise.all(emailPromises); // Wait for all emails to be sent

    // Step 6: Respond to the client
    res.status(201).json({
      message: 'Job listing created and emails sent successfully!',
      jobId: newJob._id,
    });
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
};
