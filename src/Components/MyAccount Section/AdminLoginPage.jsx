import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminLoginPage() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [adminUsername, setAdminUsername] = useState(""); // Store the logged-in admin's username

  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const validateForm = () => {
    let newErrors = { username: "", password: "" };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdminLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const adminUsername = "rajagurusk";
    const adminPassword = "root123";

    if (username === adminUsername && password === adminPassword) {
      sessionStorage.setItem("isAdmin", "true"); // Set Admin
      sessionStorage.setItem("isLoggedIn", "true"); // Store Login Status
      sessionStorage.setItem("adminUsername", username); // Store username

      setIsLoggedIn(true); // Set login status to true
      setAdminUsername(username); // Store the admin's username

      toast.success("Admin logged in successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
      navigate("/admin-dashboard");
    } else {
      toast.error("Invalid credentials!", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("adminUsername");

    setIsLoggedIn(false); // Set login status to false
    setAdminUsername(""); // Clear admin username
    navigate("/"); // Redirect to homepage or login page
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("adminUsername");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setAdminUsername(storedUsername);
    }
  }, []);

  return (
    <Box width={"100%"} height={"100%"} marginTop={"5rem"}>
      {isLoggedIn ? (
        <VStack justifyContent="flex-end" width="100%" padding="1rem">
          <Text fontSize="18px" marginRight="1rem">
            {`Welcome, Rajaguru Sivakumar`}
          </Text>
          <Button
            onClick={handleLogout}
            bg="#E53E3E"
            color="white"
            borderRadius="50px"
            _hover={{ bg: "#C53030" }}
            style={{ display: 'block', marginTop: '20px' }} // Temporary style for debugging
          >
            Logout
          </Button>
        </VStack>
      ) : (
        <VStack width={["90%", "90%", "90%", "50%"]} margin={"auto"}>
          <Text
            fontSize={["30px", "30px", "30px", "40px"]}
            fontWeight={"600"}
            letterSpacing={"2px"}
          >
            Admin Login
          </Text>

          <VStack
            width={"100%"}
            marginTop={"4rem"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"2rem"}
            backgroundColor={"#FFF7F3"}
            paddingTop={"2rem"}
            borderRadius={"50px"}
          >
            <VStack width={"70%"} alignItems={"flex-start"} gap={"1rem"}>
              <Text fontWeight={"600"} fontSize={"18px"}>
                Username
              </Text>
              <Input
                placeholder="Enter Username"
                variant={"filled"}
                bg={"#FEEDE5"}
                borderRadius={"50px"}
                width={"100%"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <Text color="red.500">{errors.username}</Text>}
            </VStack>

            <VStack width={"70%"} alignItems={"flex-start"} gap={"1rem"}>
              <Text fontWeight={"600"} fontSize={"18px"}>
                Password
              </Text>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  variant={"filled"}
                  bg={"#FEEDE5"}
                  borderRadius={"50px"}
                  width={"100%"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    bg="transparent"
                    _hover={{ bg: "#5EA98B", color: "white" }}
                    borderRadius={"50px"}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color="red.500">{errors.password}</Text>}
            </VStack>

            <HStack width={"100%"} justifyContent={"center"}>
              <Button
                width={"40%"}
                bg={"#5EA98B"}
                color={"white"}
                fontSize={"18px"}
                borderRadius={"50px"}
                _hover={{ bg: "#FEE4D7", color: "black" }}
                onClick={handleAdminLogin}
              >
                Log In
              </Button>
            </HStack>
          </VStack>
        </VStack>
      )}

      <ToastContainer />
    </Box>
  );
}

export default AdminLoginPage;
