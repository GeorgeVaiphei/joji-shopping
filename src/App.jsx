import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import CartPage from "./components/CartPage";
import ClickedItems from "./components/ClickedItems";
import ItemPage from "./components/ItemPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
