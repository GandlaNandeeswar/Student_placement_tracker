import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/auth/login", form);

            localStorage.setItem("token", response.data);

            alert("Login Successful");

            navigate("/dashboard");
            
            localStorage.setItem(
  "token",
  response.data
);

navigate("/dashboard");

        } catch (error) {

            alert("Invalid Credentials");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded mb-4"
                >
                    Login
                </button>

               

                <Link
                    to="/register"
                    className="text-blue-600"
                >
                    Don't have an account? Register
                </Link>

            </form>

        </div>
    );
}

export default Login;