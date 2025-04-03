import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
  addOrder,
} from "../../Redux/cartSlice";
import { db } from "../../Firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import qrImage from "../../assets/qr-code.png"; // Add your QR code image

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userEmail = sessionStorage.getItem("userEmail"); // Get user email from sessionStorage
  const toast = useToast(); // Initialize the toast function
  const [isQRModalOpen, setQRModalOpen] = useState(false); // State for modal

  const removeItemHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const increaseQuantityHandler = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseQuantityHandler = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  // Show payment modal
  const handleBuy = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setQRModalOpen(true);
  };

  // Confirm payment via QR
  const handleQRPayment = async () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const orderDetails = {
      id: new Date().getTime(),
      items: [...cartItems],
      totalAmount: totalAmount,
      date: new Date().toLocaleString(),
    };

    try {
      const orderRef = doc(db, "orders", userEmail);
      const orderSnapshot = await getDoc(orderRef);
      let orders = [];

      if (orderSnapshot.exists()) {
        orders = orderSnapshot.data().orders || [];
      }

      orders.push(orderDetails);
      await setDoc(orderRef, { orders });

      toast({
        title: "Order Placed Successfully!",
        description: "Your payment via QR is confirmed.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      dispatch(clearCart());
      dispatch(addOrder(orderDetails));
      setQRModalOpen(false);
    } catch (error) {
      console.error("Error saving order:", error.message);
      alert("Error saving order. Please try again later.");
    }
  };

  // Razorpay Payment
  const processRazorpayPayment = async () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_LVeCURdS7yVtg4", // Razorpay API Key
      amount: totalAmount * 100,
      currency: "INR",
      name: "DharaviVegShop",
      description: "Order Payment",
      handler: async function (response) {
        toast({
          title: "Order Placed Successfully!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        const orderDetails = {
          id: new Date().getTime(),
          items: [...cartItems],
          totalAmount: totalAmount,
          date: new Date().toLocaleString(),
        };

        // Save order in Firebase
        try {
          const orderRef = doc(db, "orders", userEmail);
          const orderSnapshot = await getDoc(orderRef);
          let orders = [];

          if (orderSnapshot.exists()) {
            orders = orderSnapshot.data().orders || [];
          }

          orders.push(orderDetails);
          await setDoc(orderRef, { orders });
        } catch (error) {
          console.error("Error saving order:", error.message);
        }

        dispatch(clearCart());
        dispatch(addOrder(orderDetails));
        setQRModalOpen(false);
      },
      prefill: {
        name: "Rajaguru Sivakumar",
        email: userEmail,
        contact: "9082512315",
      },
      theme: { color: "#38A169" },
    };

    setQRModalOpen(false);
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
                <Button colorScheme="blue" size="sm" onClick={() => decreaseQuantityHandler(item.id)}> - </Button>
                <Text fontSize="lg" fontWeight="600">Quantity: {item.quantity}</Text>
                <Button colorScheme="blue" size="sm" onClick={() => increaseQuantityHandler(item)}> + </Button>
              </HStack>

              <Button colorScheme="red" size="sm" mt={2} onClick={() => removeItemHandler(item.id)}> Remove from Cart </Button>
            </Box>
          ))}

          <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="#F7F7F7" boxShadow="sm">
            <Text fontSize="xl" fontWeight="600">
              Total: Rs.{" "}
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </Text>
          </Box>

          {/* Buy Button */}
          <HStack justifyContent={"center"}>
            <Button colorScheme="green" size="lg" mt={4} onClick={handleBuy} borderRadius="full" width="50%">
              Proceed to Payment
            </Button>
          </HStack>
        </VStack>
      )}

      {/* Payment Modal */}
      <Modal isOpen={isQRModalOpen} onClose={() => setQRModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Image src={qrImage} alt="QR Code" width="250px" mx="auto" />
            <Text mt={3}>Scan the QR Code to complete your payment.</Text>
            <Button colorScheme="blue" mt={4} onClick={handleQRPayment}> Paid via QR </Button>
            <Text my={3}>OR</Text>
            <Button colorScheme="green" onClick={processRazorpayPayment}> Proceed with Razorpay </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Cart;
