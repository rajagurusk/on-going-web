import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, VStack, Image, Button, HStack } from "@chakra-ui/react";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
} from "../../Redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const removeItemHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Increase item quantity handler
  const increaseQuantityHandler = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        itemImage: item.itemImage,
        itemTitle: item.itemTitle,
        price: item.price,
      })
    );
  };

  // Decrease item quantity handler
  const decreaseQuantityHandler = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  // ✅ Function to Handle Razorpay Payment
  const handleBuy = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_LVeCURdS7yVtg4", // ✅ Store API Key in .env
      amount: totalAmount * 100, // Convert amount to paisa (INR)
      currency: "INR",
      name: "DharaviVegShop",
      description: "Order Payment",
      handler: function (response) {
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#38A169",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <VStack spacing={4} align="normal">
          {cartItems.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <HStack spacing={4}>
                <Image src={item.itemImage} boxSize="120px" borderRadius="md" />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="600">{item.itemTitle}</Text>
                  <Text>Price: Rs. {item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </VStack>
              </HStack>

              <HStack spacing={4} justifyContent="center" mt={2}>
                <Button colorScheme="blue" size="sm" onClick={() => decreaseQuantityHandler(item.id)}>
                  -
                </Button>
                <Text fontSize="lg" fontWeight="600">Quantity: {item.quantity}</Text>
                <Button colorScheme="blue" size="sm" onClick={() => increaseQuantityHandler(item)}>
                  +
                </Button>
              </HStack>

              <Button colorScheme="red" size="sm" mt={2} onClick={() => removeItemHandler(item.id)}>
                Remove from Cart
              </Button>
            </Box>
          ))}

          {/* Total Price */}
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="#F7F7F7" boxShadow="sm">
            <Text fontSize="xl" fontWeight="600">
              Total: Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </Text>
          </Box>

          {/* Buy Button */}
          <HStack justifyContent={"center"}>
            <Button
              colorScheme="green"
              size="lg"
              mt={4}
              onClick={handleBuy}
              borderRadius="full"
              width="50%"
              _hover={{ bg: "#38A169", color: "white" }}
            >
              Proceed to Payment
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}

export default Cart;
