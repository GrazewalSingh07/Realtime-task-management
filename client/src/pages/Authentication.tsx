import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        {isLogin ? <Login /> : <Register />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;