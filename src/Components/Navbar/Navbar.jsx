import { Box, Container, HStack, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ShopLink from "./ShopLink";
import PagesLink from "./PagesLink";
import "./Navbar.css";
import SearchBox from "./SearchBox";
import DrawerMenu from "./DrawerMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const cartLength = useSelector((state) => state.cart.cartItems.length);

  const [isSticky, setIsSticky] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const products = [
    "Watermelon",
    "Tomato",
    "Mushroom",
    "Broccoli",
    "Corn",
    "Asparagus",
    "Onion",
  ];

  useEffect(() => {
    // This effect runs once when the component mounts
    const storedName = sessionStorage.getItem("userFirstName");
    // const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";

    if (storedName) {
      setUserFirstName(storedName);
      // setIsLoggedIn(true);

      // console.log(userFirstName , "-->")
    }
  }, []); // Empty dependency array ensures this runs once

  


  const handleLogout = () => {
    sessionStorage.removeItem("userFirstName");
    sessionStorage.removeItem("isLoggedIn");
    setUserFirstName("");
    setIsLoggedIn(false);
    window.location.reload(); // Refresh page after logout

    sessionStorage.removeItem("userFirstName");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");  // Remove admin session
    setUserFirstName("");
    setIsLoggedIn(false);
    window.location.reload(); // Refresh page after logout
  
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollThreshold = 0.1; // 10% of the window height

      setIsSticky(scrollPosition >= windowHeight * scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position={isSticky ? "fixed" : "static"}
      top={isSticky ? "0" : "auto"}
      zIndex={1000}
      backgroundColor={isSticky ? "white" : "transparent"}
      boxShadow={isSticky ? "0px 0px 10px rgba(0, 0, 0, 0.1)" : "none"}
      transition="background-color 0.3s ease, box-shadow 0.3s ease"
      width={"100%"}
      min-height={"10px"}
    >
      <HStack
        wrap={["wrap", "wrap", "wrap", "nowrap"]}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={[
          "space-evenly",
          "space-evenly",
          "space-evenly",
          "center",
        ]}
        alignItems={"center"}
        gap={["10px", "10px", "10px", "30px"]}
      >
        {/* Dynamic Nav Links based on User Type */}
        <HStack
          className="navLinks"
          width={"40%"}
          height={"100%"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={"30px"}
          fontWeight={"500"}
        >
          {sessionStorage.getItem("isAdmin") === "true" ? (
            <>
              <Link
                className="hover:text-[#5EC49D] transition-all duration-150 ease"
                to="/admin/orders" // Ensure this is the correct path to view the orders
              >
                View Orders
              </Link>
              <Link
                className="hover:text-[#5EC49D] transition-all duration-150 ease"
                to={"/admin/products"}
              >
                Products
              </Link>
              <Link
                className="hover:text-[#5EC49D] transition-all duration-150 ease"
                to={"/admin/customer-proof"}
              >
                Customer Proof
              </Link>
            </>
          ) : (
            <>
              <Link
                className="hover:text-[#5EC49D] transition-all duration-150 ease"
                to={"/"}
              >
                HOME
              </Link>
              <PagesLink />
              <Link to={"/contact"}>CONTACT</Link>
              <Link to={"/map"}>MAP</Link>

              <Link to={"/orders"}>Orders</Link>
            </>
          )}
        </HStack>

        <HStack
          className="drawer-icon"
          display={["block", "block", "block", "none"]}
          width={"40%"}
        >
          <DrawerMenu />
        </HStack>

        {/* Right Links */}
        <HStack
          width={["90%", "70%", "70%", "40%"]}
          height={"100%"}
          marginBottom={["30px", "30px", "30px", "0"]}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"0 20px"}
          gap={"30px"}
        >
          <SearchBox products={products} />

          {/* Cart */}
          <Link>
            <Container
              cursor={"pointer"}
              position={"relative"}
              width={"50px"}
              height={"50px"}
              display={["none", "flex", "flex", "flex"]}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"50%"}
            >
              <Link to={"/Cart"}>
                <i className="ri-shopping-bag-2-line text-2xl text-[#5EC49D] "></i>
              </Link>
              <Box
                className="group"
                position={"absolute"}
                left={"25px"}
                top={"20px"}
                width={"25px"}
                height={"25px"}
                backgroundColor={"#5EC49D"}
                fontSize={"12px"}
                borderRadius={"50%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {`${cartLength}`}
              </Box>
            </Container>
          </Link>

          {/* User Section */}
          <HStack>
            {userFirstName ? (
              <>
                <Text fontSize={"18px"} color="#5EC49D">
                  {userFirstName}
                </Text>
                <Button
                  onClick={handleLogout}
                  colorScheme="red"
                  size="sm"
                  ml={2} // Adds some spacing
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to={"/my-account"}>
                <i className="ri-user-3-line text-2xl text-[#5EC49D] hover:text-[#451D1D] font-medium"></i>
              </Link>
            )}
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
}

export default Navbar;
