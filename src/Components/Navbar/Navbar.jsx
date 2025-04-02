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

  useEffect(() => {
    const storedName = sessionStorage.getItem("userFirstName");
    if (storedName) {
      setUserFirstName(storedName);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userFirstName");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isAdmin");
    setUserFirstName("");
    setIsLoggedIn(false);
    window.location.reload(); // Refresh page after logout
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= window.innerHeight * 0.1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        justifyContent={["space-evenly", "space-evenly", "space-evenly", "center"]}
        alignItems={"center"}
        gap={["10px", "10px", "10px", "30px"]}
      >
        {/* Navigation Links */}
        <HStack className="navLinks" width={"40%"} gap={"30px"} fontWeight={"500"}>
          {sessionStorage.getItem("isAdmin") === "true" ? (
            <>
              <Link className="hover:text-[#5EC49D]" to="/admin/orders">
                View Orders
              </Link>
              <Link className="hover:text-[#5EC49D]" to="/admin/products">
                Products
              </Link>
            </>
          ) : (
            <>
              <Link className="hover:text-[#5EC49D]" to="/">
                HOME
              </Link>
              <PagesLink />
              <Link to="/contact">CONTACT</Link>
              <Link to="/map">MAP</Link>
              <Link to="/orders">ORDERS</Link>
            </>
          )}
        </HStack>

        {/* Mobile Drawer Icon */}
        <HStack className="drawer-icon" display={["block", "block", "block", "none"]} width={"40%"}>
          <DrawerMenu />
        </HStack>

        {/* Right Side: Search, Cart, User */}
        <HStack width={["90%", "70%", "70%", "40%"]} gap={"30px"} justifyContent={"center"}>
          <SearchBox products={["Watermelon", "Tomato", "Mushroom", "Broccoli", "Corn", "Asparagus", "Onion"]} />

          {/* Cart Section (Fixed Nested Links Issue) */}
          <Link to="/Cart">
            <Container cursor={"pointer"} position={"relative"} width={"50px"} height={"50px"}>
              <i className="ri-shopping-bag-2-line text-2xl text-[#5EC49D]"></i>
              {cartLength > 0 && (
                <Box
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
                  {cartLength}
                </Box>
              )}
            </Container>
          </Link>

          {/* User Account Section */}
          <HStack>
            {userFirstName ? (
              <>
                <Text fontSize={"18px"} color="#5EC49D">
                  {userFirstName}
                </Text>
                <Button onClick={handleLogout} colorScheme="red" size="sm" ml={2}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/my-account">
                <Box as="span">
                  <i className="ri-user-3-line text-2xl text-[#5EC49D] hover:text-[#451D1D] font-medium"></i>
                </Box>
              </Link>
            )}
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
}

export default Navbar;
