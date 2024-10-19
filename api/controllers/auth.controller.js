import Company from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signup = async (req, res, next) => {
  const { name, companyname, companyemail, companysize, phoneno, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Company({
    name,
    companyname,
    companyemail,
    companysize,
    phoneno,
    password: hashedPassword,
  });
console.log(req.body);

  try {
    // Save the user without OTPs first
    await newUser.save();

    // Generate email OTP
    const emailOtp = generateOTP();
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Update user with email OTP and expiration time
    newUser.emailOtp = emailOtp;
    newUser.emailOtpExpiration = expirationTime;

    await newUser.save();

    // Send OTP via Nodemailer (Email)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: companyemail,
      subject: 'Your Email OTP Verification',
      text: `Your email OTP is ${emailOtp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json('User created successfully! OTP sent to your email.');

  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  
  try {
    const validUser = await Company.findOne({ companyemail: email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

// Route to verify email OTP
export const verify_email_otp = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(req.body);
  
  try {
    const user = await Company.findOne({ companyemail: email });
    if (!user) return res.status(400).send({ success: false, message: 'User not found' });

    // Check if the OTP is expired
    if (new Date() > user.emailOtpExpiration) {
      return res.status(400).send({ success: false, message: 'Email OTP has expired' });
    }

    // Check if the OTP is correct
    if (user.emailOtp !== otp) {
      return res.status(400).send({ success: false, message: 'Invalid Email OTP' });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailOtp = undefined; // Clear OTP
    user.emailOtpExpiration = undefined; // Clear expiration
    await user.save();

    res.status(200).send({ success: true, message: 'Email OTP verified successfully' });
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};
