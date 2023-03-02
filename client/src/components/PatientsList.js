import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import PatientCard from "./PatientCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PatientsList = () => {
  const { patients, getallPatients } = useAppContext();

  useEffect(() => {
    getallPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients]);
  
  return (
    <div style={{ backgroundColor: "black"}}>
      <Row gutter={[16, 16]}>
        {patients.map((patient) => (
          <Col key={patient._id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <PatientCard patient={patient} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default PatientsList;
