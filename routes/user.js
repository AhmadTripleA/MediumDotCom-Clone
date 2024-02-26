import express from "express";
import { passport } from "../middlewares/auth.js";
import { createArticle, getUsers, signupByEmail } from "../controllers/user.js";

const router = express.Router();

router.get("/",
    getUsers);
router.post("/",
    signupByEmail);
router.post("/article",
    passport.authenticate('verifyJwt', { session: false }), createArticle);

export default router;