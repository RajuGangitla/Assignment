import express from "express";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.route("/").post(createPatient).get(getAllPatients);
router.route("/getdata/:id").get(getPatient);
router.route("/update/:id").patch(updatePatient);
router.route("/delete/:id").delete(deletePatient);

export default router;
