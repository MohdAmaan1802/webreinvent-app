import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to your dashboard!
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Your Token:</h3>
            <p className="mt-2 p-4 bg-gray-50 border border-gray-300 rounded-md text-gray-900 break-all">
              {token}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
