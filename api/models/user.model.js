import mongoose from 'mongoose';


const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyname: { type: String, required: true },
  companysize: { type: String, required: true },
  companyemail: { type: String, required: true,unique:true },
  phoneno: { type: String, required: true,  },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false },
  avatar: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  createdAt: { type: Date, default: Date.now },
  emailOtp: { type: String },
  emailOtpExpiration: { type: Date },

});

const Company = mongoose.model('Company', companySchema);
export default Company;