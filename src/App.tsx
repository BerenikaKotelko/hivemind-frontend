import NavBar from "./components/NavBar";
//for adding multiple pages for one app on lower level
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import HomePage from "./components/HomePage/HomePage";
//for pop-ups
import { ToastContainer } from "react-toastify";
//importing style sheet whereas above is importing an alias
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
//interfaces
import { IUser } from "./interfaces/IUser";
import { IResource } from "./interfaces/IResource";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();
  const [resources, setResources] = useState<IResource[]>([]);

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  const getUsers = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setUsers(res.data.data);
    },
    [baseUrl]
  );

  const getResources = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setResources(res.data.data);
    },
    [baseUrl]
  );

  useEffect(() => {
    getUsers("users");
    getResources("resources");
  }, [getUsers, getResources]);

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
        {/* different pages */}
        <Route
          path="/"
          element={<HomePage resources={resources} currentUser={currentUser} />}
        />
        <Route path="study-list" element={<>study list</>} />
        <Route path="add-resource" element={<>add a resource</>} />
      </Routes>
    </>
  );
}

export default App;
