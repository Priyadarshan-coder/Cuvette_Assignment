import express from 'express';
import {  signOut, signin, signup ,verify_email_otp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify-email-otp", verify_email_otp);
//router.post("/verify-mobile-otp",verify_mobile_otp);

router.get('/signout', signOut);

export default router;