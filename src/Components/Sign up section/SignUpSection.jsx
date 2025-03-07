import { Box, Button, HStack, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../Firebase/Firebase"; // go up 1 level to src/Components
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { getDoc } from 'firebase/firestore';



function SignUpSection() {


  const [show, setShow] = React.useState(false)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});


  const handleClick = () => setShow(!show)
  const validateInputs = () => {
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password (at least 6 characters, 1 uppercase, 1 digit)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 6 characters, include 1 uppercase & 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!validateInputs()) {
      return; // Stop signup if validation fails
    }


    try {
      // Manually create a user document in Firestore
      const userDocRef = doc(db, 'user', email); // Use email as the document ID (or use another unique identifier)

      // Check if the user already exists in Firestore
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        // If the document doesn't exist, create it with the user data
        await setDoc(userDocRef, {
          fname: firstName,
          lname: lastName,
          email: email,
          password: password,  // It's still better not to store plain passwords
        });

        console.log('User data saved in Firestore');

        console.log('User signed up and data saved to Firestore');
        toast.success("User signed up successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        console.log('User already exists');
        toast.error("Error User already exists", {
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
      console.error('Error during sign-up:', error.message);
      toast.error("Error signing up user: " + error.message, {
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
    <Box
      width={"100%"}
      height={"100%"}
      marginTop={"5rem"}
    >

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
          Sign Up
        </Text>

        <Text
          letterSpacing={"2px"}
        >
          New User? Register Here
        </Text>

        {/* Form */}
        <VStack
          width={"100%"}
          paddingBottom={"2rem"}
          // height={"100%"}
          marginTop={"4rem"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"2rem"}
          backgroundColor={'#FFF7F3'}
          paddingTop={"2rem"}
          borderRadius={"50px"}
        >

          {/* First Name */}
          <VStack
            width={"70%"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={'18px'}>First Name</Text>
            <Input
              placeholder='First Name'
              variant={"filled"}
              bg={'#FEEDE5'}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: '#FEEDE5' }}
              value={firstName} // bind input value to state
              onChange={(e) => setFirstName(e.target.value)} // update state on change
            />
            {errors.firstName && <Text color="red.500" fontSize="sm">{errors.firstName}</Text>}

          </VStack>

          {/* Last Name */}
          <VStack
            width={"70%"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={'18px'}>Last Name</Text>
            <Input
              placeholder='Last Name'
              variant={"filled"}
              bg={'#FEEDE5'}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: '#FEEDE5' }}
              value={lastName} // bind input value to state
              onChange={(e) => setLastName(e.target.value)} // update state on change

            />
            {errors.lastName && <Text color="red.500" fontSize="sm">{errors.lastName}</Text>}

          </VStack>

          {/* Email */}
          <VStack
            width={"70%"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={'18px'}>Email</Text>
            <Input
              placeholder='Enter Email'
              variant={"filled"}
              bg={'#FEEDE5'}
              borderRadius={"50px"}
              width={"100%"}
              outline={"none"}
              _hover={{ bg: '#FEEDE5' }}
              value={email} // bind input value to state
              onChange={(e) => setEmail(e.target.value)} // update state on change

            />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}

          </VStack>


          {/* Password */}
          <VStack
            width={"70%"}
            height={"100%"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Text fontWeight={"600"} fontSize={'18px'}>Password</Text>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                variant={"filled"}
                bg={'#FEEDE5'}
                borderRadius={"50px"}
                width={"100%"}
                outline={"none"}
                _hover={{ bg: '#FEEDE5' }}
                value={password} // bind input value to state
                onChange={(e) => setPassword(e.target.value)} // update state on change

              />
              <InputRightElement width='4.5rem'>
                <Button bg="transparent" _hover={{ bg: '#5EA98B', color: 'white' }} borderRadius={'50px'} h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}

          </VStack>

          {/* sign up Button */}
          <HStack
            width={'100%'}
            justifyContent={"center"}
          >
            <Button
              width={"40%"}
              bg={'#5EA98B'}
              color={'white'}
              fontSize={"18px"}
              borderRadius={"50px"}
              _hover={{ bg: '#FEE4D7', color: 'black' }}
              onClick={handleSignUp}
            >Sign Up</Button>
          </HStack>


          {/* Divider */}
          <HStack
            width={'70%'}
            height={'5px'}
            bg={'#FEEDE5'}

          ></HStack>

          {/* Button Links */}
          <HStack
            width={["100%", "100%", "100%", "100%", "70%"]}
            gap={["1rem", "1rem", "1rem", "1rem", "0rem"]}
            justifyContent={["center", 'center', 'center', 'center', "center"]}
            alignItems={"center"}
            textAlign={"center"}
            flexWrap={["wrap", "wrap", 'wrap', 'wrap', "nowrap"]}
          >


            <Link
              to={"/"}
              className='hover:text-[#5EA98B] transition-all duration-150 ease font-medium'
            >Return to Store</Link>

          </HStack>

        </VStack>

      </VStack>

      <ToastContainer />


    </Box>
  )
}

export default SignUpSection
