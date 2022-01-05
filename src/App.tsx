import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState<string[]>([
    "Matt Phan",
    "Jamie Lou",
    "Beri Kotelko",
    "Grace Zaborski",
    "Someones Name is Very Long",
  ]);
  const [currentUser, setCurrentUser] = useState<string>("");
  return (
    <>
      <NavBar
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="study-list" element={<>study list</>} />
        <Route path="add-resource" element={<>add a resource</>} />
      </Routes>
    </>
  );
}

export default App;
