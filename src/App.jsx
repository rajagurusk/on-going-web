import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
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
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ForgetPassword from "./Pages/ForgetPassword";
import SignUp from "./Pages/SignUp";
import Favourite from "./Pages/Favourite";
import SearchBox from "./Components/Navbar/SearchBox";
import Cart from "./Pages/Cart";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
// import store from "./Redux/store";
import { store, persistor } from "./Redux/store";
import { Provider } from "react-redux";
import Map from "./Components/Map/Map";
import Hero from "./Components/Hero Section/Hero";
import ShopPage from "./Components/Hero Section/ShopPage";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import "react-toastify/dist/ReactToastify.css";

import AdminLoginPage from "./Components/MyAccount Section/AdminLoginPage"; // Make sure path is correct
import AdminOrdersPage from "./Pages/AdminOrdersPage"; // Import the AdminOrdersPage component
import Orders from "./Components/Orders/Orders";
import AdminOrders from "./Pages/AdminOrdersPage";
import AdminProduct from "./Pages/AdminProduct";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // List of available products
  const products = [
    "Watermelon",
    "Tomato",
    "Mushroom",
    "Broccoli",
    "Corn",
    "Asparagus",
    "Onion",
  ];

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <BrowserRouter>
              {/* ✅ Pass products to Navbar */}
              <Navbar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                products={products}
              />

              <Routes>
                {/* <Route path="/" element={<Layout />} /> */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/shop" element={<Shop />} /> */}
                <Route path="/organic-fruits" element={<OrganicFruits />} />
                <Route
                  path="/aggregate-fruits"
                  element={<AggregrateFruits />}
                />
                <Route path="/pits-fruits" element={<PitsFruits />} />
                <Route path="/legumas-fruits" element={<LegumasFruits />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/map" element={<Map></Map>} />
                <Route path="/orders" element={<Orders></Orders>} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/searchbox" element={<SearchBox />} />
                <Route path="/" element={<Hero />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route path="/admin/orders" element={<AdminOrders />} />{" "}
                {/* Route for Admin Orders Page */}
                <Route path="/admin/products" element={<AdminProduct />} />
              </Routes>
              <Toaster />
              <Footer />
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
