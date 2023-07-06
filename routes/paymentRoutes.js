import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_xJ0DVeZbsTDNR7" })
);

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

export default router;
