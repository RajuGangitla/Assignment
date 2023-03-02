import patientModel from "../models/patientModel.js";

const createPatient = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userExists = await patientModel.findOne({ name, email });
    if (userExists) {
      return res.status(200).send({
        message: "User already exists with same name and email",
        success: true,
      });
    }
    const patient = await patientModel.create(req.body);
    res.status(201).send({
      message: "patient data added successfully",
      success: true,
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      message: "patients data fetched successfully",
      success: true,
      patients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.findById({ _id: req.params.id });
    res.status(200).send({
      message: "patient data fetched successfully",
      success: true,
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const updatePatient = async (req, res) => {
  try {
    const noUser = await patientModel.findById({ _id: req.params.id });
    if (!noUser) {
      return res.status(200).send({
        message: "patient data not found",
        success: true,
      });
    }
    const updatedPatient = await patientModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      message: "patient data updated successfully",
      success: true,
      updatedPatient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({
      message: "patient data deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

export {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
