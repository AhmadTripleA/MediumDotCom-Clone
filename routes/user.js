import express from "express";
import cont from "../controllers/user.js"

const router = express.Router();
router.get("u", cont.getUser);

module.exports = router;