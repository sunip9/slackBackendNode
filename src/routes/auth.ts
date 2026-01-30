import express from "express";
import { body } from "express-validator";
import { signIn, signUp, signOut } from "../controllers/auth";
import { validateRequest } from "../middleware/validate-request";
import { currentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User Authentication
 */

const authFieldValidation = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
];

router.post("/api/user/signup", authFieldValidation, validateRequest, signUp);

router.post("/api/user/signin", authFieldValidation, validateRequest, signIn);

router.get("/api/user/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
router.post("/api/user/signout", signOut);

export default router;
