import React, { useEffect, useState } from "react";
import { Box, Image, Link, Flex, Text } from "@chakra-ui/react";
import { db } from "../../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

function SmallMap({ userId }) {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserAddress(userDoc.data().address); // Assuming 'address' field in Firestore
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    if (userId) {
      fetchUserAddress();
    }
  }, [userId]);

  const googleMapsLink = `https://www.google.com/maps/dir//Dharavi+Vivekananda+Cooperative+Housing+Society+Limited,+Aayush+Hospital,+90+Feet+Rd,+Muslim+Nagar,+RP+Nagar,+Dharavi,+Mumbai,+Maharashtra+400017/@19.0404052,72.8520928,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7c8d453c3739f:0x155eed1a753f95c9!2m2!1d72.8546677!2d19.0404001?entry=ttu&g_ep=EgoyMDI1MDQwMS4wIKXMDSoASAFQAw%3D%3D=${encodeURIComponent(userAddress)}`;

  // Hosted image URL of your red landmark symbol
  const landmarkIcon =
    "https://www.shutterstock.com/image-vector/pinpoint-blue-white-isolated-icon-260nw-517499506.jpg"; // Replace with actual hosted URL

  return (
    <Flex direction="column" alignItems="flex-end" mt={-45} mr={10}>
      {/* Title Above the Landmark Icon */}
      <Text fontSize="sm" fontWeight="bold" mb={1} textAlign="right" mr={-5}>
        Track Order
      </Text>

      {/* Start and End Location Display */}
      {/* <Text fontSize="xs" textAlign="right" color="gray.600">
        Start: Dharavi, Mumbai
      </Text>
      <Text fontSize="xs" textAlign="right" color="gray.600">
        End: {userAddress || "Fetching..."}
      </Text> */}

      {/* Landmark Icon */}
      <Link href={googleMapsLink} isExternal>
        <Image
          src={landmarkIcon}
          alt="Landmark Location"
          boxSize="40px"
          cursor="pointer"
        />
      </Link>
    </Flex>
  );
}

export default SmallMap;
