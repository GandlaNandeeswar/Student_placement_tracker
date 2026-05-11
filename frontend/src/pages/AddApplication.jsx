import { useState } from "react";
import API from "../services/api";

function AddApplication() {

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "APPLIED",
    notes: "",
    resumeLink: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/applications", formData);

      alert("Application Added Successfully");

      setFormData({
        companyName: "",
        role: "",
        status: "APPLIED",
        notes: "",
        resumeLink: ""
      });

    } catch (error) {

      console.log(error);

      alert("Error adding application");
    }
  };

  return (

    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "auto"
      }}
    >

      <h1>Add New Application</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >

          <option value="APPLIED">
            Applied
          </option>

          <option value="INTERVIEW">
            Interview
          </option>

          <option value="OFFER">
            Offer
          </option>

          <option value="REJECTED">
            Rejected
          </option>

        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px"
          }}
        />

        <input
          type="text"
          name="resumeLink"
          placeholder="Resume Link"
          value={formData.resumeLink}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Add Application
        </button>

      </form>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

export default AddApplication;