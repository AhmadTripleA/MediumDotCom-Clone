import express from "express";

const router = express.Router();

import userRoute from '../routes/user.js' 

router.use('/users', userRoute);

export default router;