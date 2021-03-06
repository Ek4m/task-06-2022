import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CreateUser from "./pages/CreateUser";
import SingleUser from "./pages/SingleUser";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:userId" element={<SingleUser />} />
        <Route path="/users/add" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
