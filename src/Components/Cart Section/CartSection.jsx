import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, VStack, Image, Button, HStack, useToast} from "@chakra-ui/react";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
  addOrder,
} from "../../Redux/cartSlice";
import { db } from "../../Firebase/Firebase"; // go up 1 level to src/Components
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userEmail = sessionStorage.getItem("userEmail"); // Get user email from sessionStorage
  const toast = useToast(); // Initialize the toast function


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

    const orderDetails = {
      id: new Date().getTime(), // Unique order ID
      items: [...cartItems], // Store purchased items
      totalAmount: totalAmount,
      date: new Date().toLocaleString(), // Timestamp
    };

    // Store order in Firebase
    try {
      const orderRef = doc(db, "orders", userEmail); // Use email as the document ID
      const orderSnapshot = await getDoc(orderRef);
      let orders = [];

      if (orderSnapshot.exists()) {
        orders = orderSnapshot.data().orders || []; // Fetch existing orders
      }

      // Add the new order to the existing list
      orders.push(orderDetails);

      // Save the updated order list back to Firestore
      await setDoc(orderRef, { orders });

      // Clear cart after successful payment
      // dispatch(clearCart());
      // alert("Order placed successfully!");

      // Proceed to Razorpay payment
      const options = {
        key: "rzp_test_LVeCURdS7yVtg4", // Store API Key in .env
        amount: totalAmount * 100, // Convert amount to paisa (INR)
        currency: "INR",
        name: "DharaviVegShop",
        description: "Order Payment",
        handler: function (response) {
          toast({
            title: "Order Placed Successfully!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          dispatch(clearCart());
          dispatch(addOrder(orderDetails)); // Store order in Redux
        },
        prefill: {
          name: "Rajaguru Sivakumar",
          email: userEmail, // Use logged-in user's email
          contact: "9082512315",
        },
        theme: {
          color: "#38A169",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error saving order:", error.message);
      alert("Error saving order. Please try again later.");
    }
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
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
            >
              <HStack spacing={4}>
                <Image src={item.itemImage} boxSize="120px" borderRadius="md" />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="600">{item.itemTitle}</Text>
                  <Text>Price: Rs. {item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </VStack>
              </HStack>

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

              <Button
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => removeItemHandler(item.id)}
              >
                Remove from Cart
              </Button>
            </Box>
          ))}

          {/* Total Price */}
          <Box
            mt={4}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="#F7F7F7"
            boxShadow="sm"
          >
            <Text fontSize="xl" fontWeight="600">
              Total: Rs.{" "}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
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
