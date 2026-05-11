import React, { useEffect, useState } from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042"
];

const Analytics = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await API.get("/analytics");

      setData(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>Analytics Dashboard</h1>

      {/* TOP CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <Card title="Applications" value={data.total} />
        <Card title="Interviews" value={data.interviews} />
        <Card title="Offers" value={data.offers} />
        <Card title="Rejected" value={data.rejected} />

      </div>

      {/* CHARTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "50px"
        }}
      >

        {/* PIE CHART */}

        <div style={chartStyle}>

          <h2>Status Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={data.statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {data.statusData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div style={chartStyle}>

          <h2>Weekly Activity</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={data.weeklyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#8884d8"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

const Card = ({ title, value }) => {

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
};

const chartStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
};

export default Analytics;