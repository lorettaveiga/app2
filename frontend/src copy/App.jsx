import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Add from "./components/Add";
import Item from "./components/Item";
import Login from "./Login";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  const token = localStorage.getItem("token");

  const getItems = async () => {
    const res = await axios.get("http://localhost:5000/items/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(res.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getItems();
  };

  const addItem = async (item) => {
    await axios.post("http://localhost:5000/items/", item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getItems();
  };

  useEffect(() => {
    if (auth) getItems();
  }, [auth]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={auth ? <Navigate to="/items" /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/items"
          element={auth ? items.map((item) => (
            <Item key={item.id} item={item} ondelete={deleteItem} />
          )) : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={auth ? <Add add={addItem} /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
