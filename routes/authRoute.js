import express from "express";
import {
  registerController,
  loginController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routing

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);

// test routes
// router.get('/test', requireSignIn, isAdmin, testContoller)

// protected  User routh auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected Admin routh auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

export default router;
