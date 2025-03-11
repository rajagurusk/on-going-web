import React, { useState } from "react";
import { Box, Grid, Image, Text, VStack, HStack } from "@chakra-ui/react";
import itemCard from "/src/assets/Data";
import { FaShoppingBag, FaHeart, FaShareAlt } from "react-icons/fa";

const ShopPage = () => {
  const [cardStates, setCardStates] = useState(
    itemCard.map((item) => ({ ...item, isClicked: false })) // Adding a default 'isClicked' state to each item
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  const handleAddToCart = (index) => {
    console.log(`Item ${index} added to cart`);
    // Handle logic to add the item to the cart
    if (isLoggedIn) {
      alert("Added to Cart!");
    } else {
      alert("Please log in first.");
    }
  };

  const changeFavIcon = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index].isClicked = !newCardStates[index].isClicked; // Toggle the 'isClicked' state
    setCardStates(newCardStates);
  };

  return (
    <Box padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" marginBottom="2rem">
        Shop Items
      </Text>

      <Grid
        templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} // Responsive grid
        gap="2rem"
        justifyContent="center"
      >
        {cardStates.map((item, index) => (
          <VStack
            key={item.id}
            border="1px solid #ccc"
            borderRadius="10px"
            padding="1rem"
            width="250px"
            textAlign="center"
            background="white"
            boxShadow="md"
          >
            <Image
              src={item.itemImage}
              alt={item.itemTitle}
              width="150px"
              height="150px"
              objectFit="cover"
              borderRadius="10px"
            />
            <Text fontSize="lg" fontWeight="bold">{item.itemTitle}</Text>
            <Text fontSize="md" color="green.500">₹{item.price}</Text>

            {/* Icon Container */}
            <HStack
              spacing="1rem" // Adjust space between icons
              justifyContent="center"
              alignItems="center"
            >
              {/* Shopping Bag Icon */}
              <HStack
                width="40px"
                height="40px"
                backgroundColor="#5DA88A"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                color="white"
                cursor="pointer"
                transition="all 0.2s linear"
                _hover={{ transform: "scale(1.1)" }}
                onClick={() => handleAddToCart(index)} // Trigger Add to Cart
              >
                <FaShoppingBag />
              </HStack>

              {/* Favourite Icon */}
              <HStack
                width="40px"
                height="40px"
                backgroundColor="#5DA88A"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                color="white"
                cursor="pointer"
                transition="all 0.2s linear"
                _hover={{ transform: "scale(1.1)" }}
                onClick={() => changeFavIcon(index)} // Toggle favorite state
              >
                <FaHeart
                  className={item.isClicked ? "text-[#FEE4D7]" : "text-white"}
                />
              </HStack>

              {/* Share Icon */}
              <HStack
                width="40px"
                height="40px"
                backgroundColor="#5DA88A"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                color="white"
                cursor="pointer"
                transition="all 0.2s linear"
                _hover={{ transform: "scale(1.1)" }}
              >
                <FaShareAlt />
              </HStack>
            </HStack>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopPage;
