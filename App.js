import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Designer } from "./pages/Designer";
import { Cart } from "./pages/Cart";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartCollection = await getDocs(collection(db, "cart"));
      setCart(cartCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex space-x-4 bg-white p-4 shadow-md rounded-lg">
          <Link to="/" className="text-blue-600">Home</Link>
          <Link to="/shop" className="text-blue-600">Shop</Link>
          <Link to="/designer" className="text-blue-600">Designer</Link>
          <Link to="/cart" className="text-blue-600">Cart ({cart.length})</Link>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/designer" element={<Designer setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
