import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import CartPage from "./components/CartPage";
import ClickedItems from "./components/ClickedItems";
import ItemPage from "./components/ItemPage";
import Profile from "./components/Profile";
import ProfileInformation from "./subComponents/ProfileInformation";
import ProfilePage from "./components/ProfilePage";
import Cart from "./components/Cart";

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
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      {/* <Profile /> */}
      {/* <ProfileInformation /> */}
    </>
  );
}

export default App;
