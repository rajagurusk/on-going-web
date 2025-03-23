import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../Firebase/Firebase"; // go up 1 level to src/Components
import { getFirestore, doc, getDoc , setDoc } from 'firebase/firestore';



function ContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        // Reference to the Firestore document where we will store the contact info
        const contactDocRef = doc(db, "Contact_details", email); // Using email as the document ID

        // Check if the contact already exists in Firestore
        const docSnapshot = await getDoc(contactDocRef);

        if (!docSnapshot.exists()) {
          // If the document doesn't exist, create it with the contact details
          await setDoc(contactDocRef, {
            name: name,
            email: email,
            phone: phone,
          });

          console.log("Contact message saved in Firestore");

          toast.success("Message Sent Successfully!", {
            position: "top-right",
            autoClose: 5000,
          });

          // Clear the input fields after successful submission
          setName("");
          setEmail("");
          setPhone("");
        } else {
          console.log("Email already exists");
          toast.error("Email already exists! Please use a different email.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error(
          "Failed to send message. Please try again later. Error: " +
            error.message
        );
      }
    }
  };

  return (
    <Box width={"100%"} height={"100%"} marginTop={"5rem"}>
      <VStack
        width={["90%", "90%", "90%", "50%"]}
        height={"100%"}
        margin={"auto"}
      >
        <Text
          fontSize={["25px", "30px", "30px", "40px"]}
          fontWeight={"600"}
          letterSpacing={"2px"}
        >
          Contact
        </Text>

        <Text letterSpacing={"2px"}>Get in Touch with Us:</Text>

        {/* Form */}
        <VStack
          width={"100%"}
          paddingBottom={"2rem"}
          marginTop={"4rem"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"2rem"}
          backgroundColor={"#FFF7F3"}
          paddingTop={"2rem"}
          borderRadius={"50px"}
        >
          {/* Name */}
          <VStack
            width={["90%", "90%", "90%", "70%"]}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={"18px"}>
              Name
            </Text>
            <Input
              placeholder="Name"
              variant={"filled"}
              bg={"#FEEDE5"}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: "#FEEDE5" }}
              value={name} // bind input value to state
              onChange={(e) => setName(e.target.value)} // update state on change
            />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
          </VStack>

          {/* Email */}
          <VStack
            width={["90%", "90%", "90%", "70%"]}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
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

          {/* Phone */}
          <VStack
            width={["90%", "90%", "90%", "70%"]}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={"18px"}>
              Phone
            </Text>
            <Input
              placeholder="Phone"
              variant={"filled"}
              bg={"#FEEDE5"}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: "#FEEDE5" }}
              value={phone} // bind input value to state
              onChange={(e) => setPhone(e.target.value)} // update state on change
            />
            {errors.phone && <Text color="red.500">{errors.phone}</Text>}
          </VStack>

          {/* Buttons */}
          <HStack
            width={["90%", "90%", "90%", "70%"]}
            justifyContent={"space-between"}
          >
            <Button
              width={"40%"}
              bg={"#5EA98B"}
              color={"white"}
              fontSize={"18px"}
              borderRadius={"50px"}
              _hover={{ bg: "#FEE4D7", color: "black" }}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </HStack>
        </VStack>

        <VStack width={"100%"} alignItems={"flex-start"} marginTop={"2rem"}>
          {/* Phone */}
          <HStack
            width={"50%"}
            height={"100%"}
            paddingY={"1rem"}
            // backgroundColor={'red'}
            _hover={{
              border: "1px solid #5EA98B",
            }}
            transition={"all 0.3s ease-in-out"}
          >
            {/*Phone icon  */}
            <HStack
              width={"50px"}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"50%"}
              backgroundColor={"#FFF7F3"}
            >
              <FaPhoneAlt color="#5EA98B" />
            </HStack>

            {/*Phone details  */}
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"18px"} fontWeight={"600"}>
                Phone
              </Text>

              <Text>Toll-Free: +91 9082512315</Text>

              {/* <Text>
                    Fax: 1800-123-4567
                </Text> */}
            </VStack>
          </HStack>

          {/* Email */}
          <HStack
            width={"50%"}
            height={"100%"}
            paddingY={"1rem"}
            // backgroundColor={'red'}
            _hover={{
              border: "1px solid #5EA98B",
            }}
            transition={"all 0.3s ease-in-out"}
          >
            {/*Email icon  */}
            <HStack
              width={"50px"}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"50%"}
              backgroundColor={"#FFF7F3"}
            >
              <MdEmail color="#5EA98B" />
            </HStack>

            {/*Email details  */}
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"18px"} fontWeight={"600"}>
                Email
              </Text>

              <Text>rajagurusivakumar1@gmail.com</Text>

              {/* <Text>
                    support@example.com
                </Text> */}
            </VStack>
          </HStack>

          {/* Address */}
          <HStack
            width={"50%"}
            height={"100%"}
            paddingY={"1rem"}
            // backgroundColor={'red'}
            _hover={{
              border: "1px solid #5EA98B",
            }}
            transition={"all 0.3s ease-in-out"}
          >
            {/*Address icon  */}
            <HStack
              width={"50px"}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"50%"}
              backgroundColor={"#FFF7F3"}
            >
              <FaLocationArrow color="#5EA98B" />
            </HStack>

            {/*Address details  */}
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"18px"} fontWeight={"600"}>
                Address
              </Text>

              <Text>No.123, 90 Feet Road,</Text>

              <Text>Maharashtra ,Mumbai-17</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <ToastContainer />
    </Box>
  );
}

export default ContactSection;
