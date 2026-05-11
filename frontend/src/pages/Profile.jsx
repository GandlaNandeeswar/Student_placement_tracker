import { useState } from "react";

function Profile() {

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Nandeeswar G",
    studentId: "1MV22CS001",
    email: "nande@gmail.com",
    phone: "9876543210",
    location: "Bangalore",
    college: "MVIT",
    degree: "B.E",
    branch: "CSE",
    cgpa: "8.5",
    passingYear: "2026",
    skills: "Java, Spring Boot, React, PostgreSQL",
    experience: "Java Full Stack Internship",
    currentStatus: "Open To Work",
    github: "",
    linkedin: ""
  });

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (

    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <h1>My Profile</h1>

        <button
          onClick={() => setEditing(!editing)}
          style={buttonStyle}
        >
          {editing ? "Save Profile" : "Edit Profile"}
        </button>

      </div>

      <div style={cardStyle}>

        <ProfileInput
          label="Full Name"
          name="name"
          value={profile.name}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Student ID"
          name="studentId"
          value={profile.studentId}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Email"
          name="email"
          value={profile.email}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Phone"
          name="phone"
          value={profile.phone}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Location"
          name="location"
          value={profile.location}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="College"
          name="college"
          value={profile.college}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Degree"
          name="degree"
          value={profile.degree}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Branch"
          name="branch"
          value={profile.branch}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="CGPA"
          name="cgpa"
          value={profile.cgpa}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Passing Year"
          name="passingYear"
          value={profile.passingYear}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Skills"
          name="skills"
          value={profile.skills}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Experience"
          name="experience"
          value={profile.experience}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="Current Status"
          name="currentStatus"
          value={profile.currentStatus}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="GitHub"
          name="github"
          value={profile.github}
          editing={editing}
          onChange={handleChange}
        />

        <ProfileInput
          label="LinkedIn"
          name="linkedin"
          value={profile.linkedin}
          editing={editing}
          onChange={handleChange}
        />

      </div>

    </div>
  );
}

function ProfileInput({
  label,
  name,
  value,
  editing,
  onChange
}) {

  return (

    <div style={{ marginBottom: "20px" }}>

      <label
        style={{
          fontWeight: "bold",
          display: "block",
          marginBottom: "8px"
        }}
      >
        {label}
      </label>

      {editing ? (

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          style={inputStyle}
        />

      ) : (

        <div style={valueStyle}>
          {value || "Not Added"}
        </div>

      )}

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};

const valueStyle = {
  padding: "12px",
  background: "#f5f5f5",
  borderRadius: "8px"
};

const buttonStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Profile;