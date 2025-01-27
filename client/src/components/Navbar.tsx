import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import Modal from "../customComponents/Modal";
import { useState } from "react";
import CreateProjectForm from "./projects/ProjectForm";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/login");  
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="w-full bg-slate-900 text-white h-20 p-4 flex justify-between items-center">
      <div className="flex-1">
          <button onClick={openModal} className="button">
            Create project </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
            <CreateProjectForm/>
      </Modal>
         </div>  
      <button
        onClick={handleLogout}
        className="button"
      >
        Logout
      </button>
    </div>
  );
};