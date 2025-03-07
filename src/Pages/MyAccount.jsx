import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { auth, db } from "/src/Firebase/Firebase"; 
import { getDoc, doc } from 'firebase/firestore';
import LoginPage from "../Components/MyAccount Section/LoginPage";


function MyAccount() {
  const [user, setUser] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch contact details from Firestore using email as document ID
        const contactDocRef = doc(db, "Contact_details", currentUser.email);
        const docSnapshot = await getDoc(contactDocRef);

        if (docSnapshot.exists()) {
          setContactDetails(docSnapshot.data());
        } else {
          setContactDetails(null); // No contact details found
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box width="100%" height="100%" marginTop="5rem">
      {user ? (
        <VStack spacing={4} p={5} boxShadow="md" borderRadius="10px">
          <Text fontSize="2xl" fontWeight="bold">My Contact Details</Text>
          {contactDetails ? (
            <>
              <Text><strong>Name:</strong> {contactDetails.name}</Text>
              <Text><strong>Email:</strong> {contactDetails.email}</Text>
              <Text><strong>Phone:</strong> {contactDetails.phone}</Text>
            </>
          ) : (
            <Text>No contact details found.</Text>
          )}
        </VStack>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
}

export default MyAccount;
