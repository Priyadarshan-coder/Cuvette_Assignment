import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const routes = express.Router();

routes.post('/create-listing', verifyToken, createListing);
export default routes;