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
import { useState } from "react";

import { Toaster } from "react-hot-toast";

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
      <ChakraProvider>
        <BrowserRouter>
          {/* ✅ Pass products to Navbar */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} products={products} />

          <Routes>
            {/* <Route path="/" element={<Layout />} /> */}
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
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/signUp" element={<SignUp />} />
            {/* <Route path='/cart' element={<Cart />} /> */}
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/searchbox" element={<SearchBox/>}/>
          </Routes>
          <Toaster />
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
