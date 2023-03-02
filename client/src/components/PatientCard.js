import { Card, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PhoneOutlined,
  PushpinOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const PatientCard = ({ patient }) => {
  const { deletePatient } = useAppContext();
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 20 }}>
      <Card
        title={<span style={{ fontSize: 24 }}>{patient.name}</span>}
        actions={[
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-patient/${patient._id}`)}
            style={{ display: "flex", alignItems: "center", marginLeft: 100 }}
          >
            Edit
          </Button>,
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deletePatient(patient._id)}
            style={{ display: "flex", alignItems: "center" }}
          >
            Delete
          </Button>,
        ]}
        style={{
          borderRadius: 10,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
        bodyStyle={{ padding: 20 }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <EditOutlined
            style={{ marginRight: 8, fontSize: 20, color: "#1890ff" }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#666" }}>
            Email:
          </Text>
          <Text style={{ marginLeft: 8, fontSize: 16, color: "#666" }}>
            {patient.email}
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <PhoneOutlined
            style={{ marginRight: 8, fontSize: 20, color: "#1890ff" }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#666" }}>
            Phone:
          </Text>
          <Text style={{ marginLeft: 8, fontSize: 16, color: "#666" }}>
            {patient.phone}
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <EnvironmentOutlined
            style={{ marginRight: 8, fontSize: 20, color: "#1890ff" }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#666" }}>
            Address:
          </Text>
          <Text style={{ marginLeft: 8, fontSize: 16, color: "#666" }}>
            {patient.address}
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <PushpinOutlined
            style={{ marginRight: 8, fontSize: 20, color: "#1890ff" }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#666" }}>
            Pincode:
          </Text>
          <Text style={{ marginLeft: 8, fontSize: 16, color: "#666" }}>
            {patient.pincode}
          </Text>
        </div>
      </Card>
    </div>
  );
};
export default PatientCard;
