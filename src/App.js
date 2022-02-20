import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// Styles
import "./App.scss"

// Pages
import Home from "./pages/home/Home"
import Products from "./pages/products/Products"
import ProductDetails from "./pages/productDetails/ProductDetails"
import Cart from "./pages/cart/Cart"
import Admin from "./pages/admin/Admin"
import Login from "./pages/login/Login"

// Components
import Footer from "./components/footer/Footer"

// Hooks
import { useLogout } from "./hooks/useLogout"
import Navbar from "./components/navbar/Navbar"

function App() {
  const { user, authIsReady } = useAuthContext()
  const { logout } = useLogout()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar user={user} logout={logout}/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {!user && <Route path="/login" element={<Login />} />}
            {user && <Route path="/login" element={<Navigate to="/admin" />} />}

            {user && <Route path="/admin" element={<Admin />} />}
            {!user && (
              <Route path="/admin" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </BrowserRouter>
      )}
      <Footer />
    </div>
  );
}

export default App;
