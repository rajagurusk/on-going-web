import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, VStack, Image, Button, HStack, useToast } from "@chakra-ui/react";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  setCart,
} from "../../Redux/cartSlice";
import { saveCartToFirebase, getCartFromFirebase } from "../../Firebase/cartUtils";
import { auth } from "../../Firebase/Firebase";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const toast = useToast();

// Reset cart state on logout
const handleLogout = () => {
  // Reset Redux cart state
  dispatch(setCart([])); // Assuming `setCart` resets the cart to an empty array
  // Optionally reset local state if you are using `useState`
  setCart([]);
  // Clear cart from localStorage if necessary
  localStorage.removeItem("cart"); // Optional, if cart is stored in localStorage
  // Other logout logic like updating auth state, etc.
};


  useEffect(() => {
    const fetchCart = async () => {
      if (auth.currentUser) {
        const savedCart = await getCartFromFirebase();
        dispatch(setCart(savedCart));
      }
    };

    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    if (auth.currentUser) {
      saveCartToFirebase(cartItems);
    }
  }, [cartItems]);

  const removeItemHandler = (itemId) => {
    if (!paymentSuccessful) {
      dispatch(removeFromCart(itemId));
    }
  };

  const increaseQuantityHandler = (item) => {
    if (!paymentSuccessful) {
      dispatch(
        addToCart({
          id: item.id,
          itemImage: item.itemImage,
          itemTitle: item.itemTitle,
          price: item.price,
        })
      );
    }
  };

  const decreaseQuantityHandler = (itemId) => {
    if (!paymentSuccessful) {
      dispatch(decreaseQuantity(itemId));
    }
  };

  const handleBuy = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before proceeding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const totalAmount = cartItems.reduce(
      (total, item) => (item.paid ? total : total + item.price * item.quantity),
      0
    );

    const options = {
      key: "rzp_test_LVeCURdS7yVtg4", // Store API Key in .env
      amount: totalAmount * 100, // Convert to paisa (INR)
      currency: "INR",
      name: "DharaviVegShop",
      description: "Order Payment",
      handler: async function (response) {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Mark payment as successful and update cart items to "paid"
        setPaymentSuccessful(true);
        setPaymentInProgress(false);

        // Update the cart items to reflect "paid" status, without clearing the cart
        const updatedCart = cartItems.map((item) => ({
          ...item,
          paid: true, // Add paid property to the item
          orderStatus: "Ordered", // Add orderStatus property
        }));
        dispatch(setCart(updatedCart)); // Update cart in Redux

        // Optionally save the updated cart to Firebase if required
        await saveCartToFirebase(updatedCart);
      },
      prefill: {
        name: "Rajaguru Sivakumar",
        email: "rajagurusivakumar@example.com",
        contact: "9082512315",
      },
      theme: {
        color: "#38A169",
      },
    };

    setPaymentInProgress(true); // Start payment in progress state

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const renderOrderStatus = (status) => {
    const statusOrder = ["Ordered", "Shipped", "Delivered"];
    const statusIndex = statusOrder.indexOf(status);
    return (
      <HStack spacing={2} justify="center" align="center">
        {statusOrder.map((s, idx) => (
          <HStack key={s} spacing={1} align="center">
            <Text color={idx <= statusIndex ? "green.500" : "gray.400"} fontWeight="bold">
              {s}
            </Text>
            {idx < statusOrder.length - 1 && (
              <Box as="span" borderBottom="2px" borderColor={idx < statusIndex ? "green.500" : "gray.300"} width="30px"></Box>
            )}
          </HStack>
        ))}
      </HStack>
    );
  };

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        Your Cart
      </Text>

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

                {/* Display "Paid" Text on the Right Side */}
                {item.paid && (
                  <Box flex="1" textAlign="right">
                    <Text color="green.500" fontWeight="bold">
                      Paid
                    </Text>
                  </Box>
                )}
              </HStack>

              {item.paid && renderOrderStatus(item.orderStatus)} {/* Display order status */}

              {!item.paid && (
                <HStack spacing={4} justifyContent="center" mt={2}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => decreaseQuantityHandler(item.id)}
                  >
                    -
                  </Button>
                  <Text fontSize="lg" fontWeight="600">
                    Quantity: {item.quantity}
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => increaseQuantityHandler(item)}
                  >
                    +
                  </Button>
                </HStack>
              )}

              {!item.paid && (
                <Button
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => removeItemHandler(item.id)}
                >
                  Remove from Cart
                </Button>
              )}
            </Box>
          ))}

          {/* Total Price - This will be hidden after payment */}
          {!paymentSuccessful && (
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="#F7F7F7" boxShadow="sm">
              <Text fontSize="xl" fontWeight="600">
                Total: Rs.{" "}
                {cartItems.reduce(
                  (total, item) => (item.paid ? total : total + item.price * item.quantity),
                  0
                )}
              </Text>
            </Box>
          )}

          {!paymentSuccessful && !paymentInProgress && (
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
          )}

          {paymentInProgress && (
            <Text mt={4} fontSize="xl" color="orange.500">
              Payment in progress... Please wait.
            </Text>
          )}

          {paymentSuccessful && (
            <Box mt={4}>
              <Text fontSize="2xl" color="green.500">
                Payment Successful! Thank you for your order.
              </Text>
            </Box>
          )}
        </VStack>
      )}
    </Box>
  );
}

export default Cart;
