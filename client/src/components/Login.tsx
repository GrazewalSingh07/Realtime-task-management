import React, { useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/AuthSlice";
import { RootState } from "../store/store";
import useAxios from "../hooks/useAxios"; 
 
interface LoginResponse {
  user: {
    uuid: string;
    name: string;
    email: string;
  };
  isAuthenticated: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
 
  const { data, loading, error: axiosError, makeRequest } = useAxios<LoginResponse>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
 
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
 
    await makeRequest({
      method: "POST",
      url: "http://localhost:5000/api/auth/login",
      data: { email, password },
      withCredentials: true,
    });
  };
 
  React.useEffect(() => {
    if (data) {
      dispatch(login({ user: data.user, isAuthenticated: data.isAuthenticated }));
      navigate("/dashboard");  
    }
  }, [data, dispatch, navigate]); 
  React.useEffect(() => {
    if (axiosError) {
      setError(axiosError.response?.data?.message || "Invalid email or password");
    }
  }, [axiosError]);
 
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;