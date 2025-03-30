import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Layout from "./Pages/Layout";
import OrganicFruits from "./Pages/OrganicFruits";
import AggregrateFruits from "./Pages/AggregrateFruits";
import PitsFruits from "./Pages/PitsFruits";
import LegumasFruits from "./Pages/LegumasFruits";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Faq from "./Pages/Faq";
import MyAccount from "./Pages/MyAccount";
import Contact from "./Pages/Contact";
import ForgetPassword from "./Pages/ForgetPassword";
import SignUp from "./Pages/SignUp";
import Favourite from "./Pages/Favourite";
import SearchBox from "./Components/Navbar/SearchBox";
import Cart from "./Pages/Cart";
import Map from "./Components/Map/Map";
import Hero from "./Components/Hero Section/Hero";
import ShopPage from "./Components/Hero Section/ShopPage";
import Orders from "./Components/Orders/Orders";
import AdminLoginPage from "./Components/MyAccount Section/AdminLoginPage";
import AdminOrders from "./Pages/AdminOrdersPage";
import AdminProduct from "./Pages/AdminProduct";

import { ProductProvider } from "./Pages/ProductContext"; // Fixed the import path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProductProvider> {/* Wrap the entire app to provide products globally */}
          <ChakraProvider>
            <BrowserRouter>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/organic-fruits" element={<OrganicFruits />} />
                <Route path="/aggregate-fruits" element={<AggregrateFruits />} />
                <Route path="/pits-fruits" element={<PitsFruits />} />
                <Route path="/legumas-fruits" element={<LegumasFruits />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/map" element={<Map />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/searchbox" element={<SearchBox />} />
                <Route path="/hero" element={<Hero />} />
                <Route path="/shop-page" element={<ShopPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/products" element={<AdminProduct />} />
              </Routes>

              <Toaster />
              <Footer />
            </BrowserRouter>
          </ChakraProvider>
        </ProductProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
