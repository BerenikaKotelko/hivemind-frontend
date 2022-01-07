import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const [users, setUsers] = useState<string[]>([
  //   "Matt Phan",
  //   "Jamie Lou",
  //   "Beri Kotelko",
  //   "Grace Zaborski",
  //   "Someones Name is Very Long",
  // ]);
  const users = [
    "Matt Phan",
    "Jamie Lou",
    "Beri Kotelko",
    "Grace Zaborski",
    "Someones Name is Very Long",
  ];
  const [currentUser, setCurrentUser] = useState<string>("");
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
