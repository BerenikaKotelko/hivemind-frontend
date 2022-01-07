import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import HomePage from "./components/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IUser } from "./interfaces/IUser";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  const getUsers = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setUsers(res.data.data);
    },
    [baseUrl]
  );

  useEffect(() => {
    getUsers("users");
  }, [getUsers]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="study-list" element={<>study list</>} />
        <Route path="add-resource" element={<>add a resource</>} />
      </Routes>
    </>
  );
}

export default App;
