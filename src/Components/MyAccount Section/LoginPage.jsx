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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase"; // go up 1 level to src/Components
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => setShow(!show);

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
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

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      sessionStorage.removeItem("userFirstName"); // Clear previous user's first name

      // Fetch the user document from Firestore using email as the document ID
      const userDocRef = doc(db, "user", email); // Assuming 'users' is your Firestore collection
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        // Check if the entered password matches the one in the database
        if (userData.password === password) {
          sessionStorage.setItem("isLoggedIn", "true"); // Set login status

          // setUserFirstName(userData.firstName);  // Store the first name
          console.log("User logged in successfully:", userData);
          sessionStorage.setItem("userFirstName", userData.fname);

          toast.success("User logged in successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // Redirect to another page after login, for example, a dashboard
          navigate("/");
        } else {
          toast.error("Invalid password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("User not found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Error during login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Box width={"100%"} height={"100%"} marginTop={"5rem"}>
      <VStack
        width={["90%", "90%", "90%", "50%"]}
        height={"100%"}
        // backgroundColor={'red'}
        margin={"auto"}
      >
        <Text
          fontSize={["30px", "30px", "30px", "40px"]}
          fontWeight={"600"}
          letterSpacing={"2px"}
        >
          Log In
        </Text>

        <Text letterSpacing={"2px"}>Login for Existing Users</Text>

        {/* Form */}
        <VStack
          width={"100%"}
          paddingBottom={"2rem"}
          // height={"100%"}
          marginTop={"4rem"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"2rem"}
          backgroundColor={"#FFF7F3"}
          paddingTop={"2rem"}
          borderRadius={"50px"}
        >
          {/* Email */}
          <VStack width={"70%"} alignItems={"flex-start"} gap={"1rem"}>
            <Text fontWeight={"600"} fontSize={"18px"}>
              Email
            </Text>
            <Input
              placeholder="Enter Email"
              variant={"filled"}
              bg={"#FEEDE5"}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: "#FEEDE5" }}
              value={email} // bind input value to state
              onChange={(e) => setEmail(e.target.value)} // update state on change
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </VStack>

          {/* Password */}
          <VStack
            width={"70%"}
            height={"100%"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
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
                outline={"none"}
                _hover={{ bg: "#FEEDE5" }}
                value={password} // bind input value to state
                onChange={(e) => setPassword(e.target.value)} // update state on change
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

          {/* Log in Button */}
          <HStack width={"100%"} justifyContent={"center"}>
            <Button
              width={"40%"}
              bg={"#5EA98B"}
              color={"white"}
              fontSize={"18px"}
              borderRadius={"50px"}
              _hover={{ bg: "#FEE4D7", color: "black" }}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </HStack>

          {/* Divider */}
          <HStack width={"70%"} height={"5px"} bg={"#FEEDE5"}></HStack>

          {/* Button Links */}
          <HStack
            width={["100%", "100%", "100%", "100%", "70%"]}
            gap={["1rem", "1rem", "1rem", "1rem", "0rem"]}
            justifyContent={[
              "center",
              "center",
              "center",
              "center",
              "space-between",
            ]}
            alignItems={"center"}
            textAlign={"center"}
            flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
          >
            <Link
              to={"/forgetPassword"}
              className="hover:text-[#5EA98B] transition-all duration-150 ease font-medium"
            >
              Forgot Password?
            </Link>

            <Link
              to={"/signUp"}
              className="hover:text-[#5EA98B] transition-all duration-150 ease font-medium"
            >
              Create account
            </Link>

            {/* <Link
              to={"/"}
              className="hover:text-[#5EA98B] transition-all duration-150 ease font-medium"
            >
              Return to Store
            </Link> */}

            {/* Admin Link */}
            <Link
              to={"/admin"}
              className="hover:text-[#5EA98B] transition-all duration-150 ease font-medium"
            >
              Admin Login
            </Link>
          </HStack>
        </VStack>
      </VStack>

      <ToastContainer />
    </Box>
  );
}

export default LoginPage;
