import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient] = useState([]);
  const { updatePatient, displaySpinner, clearSpinner } = useAppContext();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await axios.get(`/api/v1/patients/getdata/${id}`);
        if (res.data.success) {
          setValues(res.data.patient);
        } else {
          message.error("Cannot fetch patient details");
        }
      } catch (error) {
        message.error("Something went wrong");
      }
    };
    getPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient({ values, id });
    setValues("");
  };

  useEffect(() => {
    if (patient) {
      setValues({
        name: patient.name || "",
        email: patient.email || "",
        phone: patient.phone || "",
        address: patient.address || "",
        pincode: patient.pincode || "",
      });
    }
  }, [patient]);

  return (
    <div>
      <Wrapper>
        <Form className="form-container" onSubmit={handleSubmit}>
          <h2 className="text-center">Patient Details Form </h2>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              type="pincode"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
            />
          </Form.Group>
          <div className="d-flex justify-content-center mb-2 ">
            <Button variant="danger" type="submit" style={{ marginRight: 10 }}>
              Update
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </Form>
      </Wrapper>
    </div>
  );
};
export default EditPage;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  .form-container {
    width: 550px;
    background-color: black;
    padding: 10px;
    margin: 0 auto;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    .form-container {
      max-width: 95%;
      padding: 0 10px;
    }
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    color: yellow;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  h6 {
    font-size: 1rem;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    h6 {
      font-size: 1rem;
    }
  }
`;
