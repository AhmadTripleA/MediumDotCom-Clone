import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../models/user.js";
import dotenv from "dotenv";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

dotenv.config({ path: "./config.env" });

const verifyJwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY
    },
    async function (jwt_payload, done) {
        console.log("JWT Payload is:\n", jwt_payload);

        try {
            const user = await User.findById(jwt_payload._id);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    });

passport.use("verifyJwt", verifyJwtStrategy);

export { passport };