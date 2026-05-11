import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {

  const [data, setData] = useState({
    total: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
    recent: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const response = await API.get("/analytics");

      setData(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>Dashboard</h1>

      {/* CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Applications</h3>
          <h1>{data.total}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Interviews</h3>
          <h1>{data.interviews}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Offers</h3>
          <h1>{data.offers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Rejected</h3>
          <h1>{data.rejected}</h1>
        </div>

      </div>

      {/* RECENT APPLICATIONS */}

      <div style={{ marginTop: "50px" }}>

        <h2>Recent Applications</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse"
          }}
        >

          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {data.recent?.map((app) => (

  <tr key={app.id}>
    <td>{app.companyName}</td>
    <td>{app.role}</td>
    <td>{app.status}</td>
  </tr>

))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
};

export default Dashboard;