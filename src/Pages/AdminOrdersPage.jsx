import React, { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Spinner, Button, useToast } from "@chakra-ui/react";
import { db } from "../Firebase/Firebase"; // Firebase config
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders"); // Get all user orders
        const querySnapshot = await getDocs(ordersCollection);
        const allOrders = [];

        for (const orderDoc of querySnapshot.docs) {
          const userEmail = orderDoc.id;
          const userOrders = orderDoc.data().orders || [];

          // ✅ Fetch the registered address from "users" collection
          const userRef = doc(db, "user", userEmail);
          const userSnap = await getDoc(userRef);
          const userAddress = userSnap.exists() ? userSnap.data().address || "No Address Provided" : "No Address Found";

          // console.log(userSnap.data() , ">>>>>>>>>>"); // Log the user data to check address field


          userOrders.forEach((order) => {
            allOrders.push({ ...order, userEmail, userAddress }); // Add userAddress to order
          });
        }
        

        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  // ✅ Function to update order status
  const updateOrderStatus = async (orderId, userEmail, status) => {
    try {
      const orderRef = doc(db, "orders", userEmail);
      const orderSnapshot = await getDoc(orderRef);

      if (orderSnapshot.exists()) {
        let updatedOrders = orderSnapshot.data().orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        );

        await setDoc(orderRef, { orders: updatedOrders });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId && order.userEmail === userEmail
              ? { ...order, status }
              : order
          )
        );

        toast({
          title: `Order ${status.toUpperCase()}`,
          description: `Order has been marked as ${status}.`,
          status: status === "accepted" ? "success" : "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading orders...</Text>
      </Box>
    );
  }

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        All User Orders
      </Text>

      {orders.length === 0 ? (
        <Text>No orders found!</Text>
      ) : (
        <VStack spacing={4} align="normal">
          {orders.map((order, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              width="100%"
            >
              <Text fontSize="xl" fontWeight="600">
                Order ID: {order.id}
              </Text>
              <Text>Order Date: {order.date}</Text>
              <Text fontSize="lg" fontWeight="600" mt={2}>
                Total: Rs. {order.totalAmount}
              </Text>
              <Text mt={2}>User Email: {order.userEmail}</Text>
              
              {/* Displaying User's Address */}
              <Text mt={2} fontWeight="bold">
                Address: {order.userAddress}
              </Text>

              <VStack spacing={2} mt={4} align="start">
                <Text fontWeight="bold">Items:</Text>
                {order.items.map((item, index) => (
                  <HStack key={index} spacing={4} justifyContent="start">
                    <Text>{item.itemTitle}</Text>
                    <Text>Price: Rs. {item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </HStack>
                ))}
              </VStack>

              {/* ✅ Accept & Reject Buttons */}
              <HStack spacing={4} mt={4} justifyContent="center">
                <Button
                  colorScheme="green"
                  onClick={() => updateOrderStatus(order.id, order.userEmail, "accepted")}
                  isDisabled={order.status === "accepted"}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => updateOrderStatus(order.id, order.userEmail, "rejected")}
                  isDisabled={order.status === "rejected"}
                >
                  Reject
                </Button>
              </HStack>

              {/* ✅ Show Status in Bold */}
              {order.status && (
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={order.status === "accepted" ? "green.500" : "red.500"}
                  mt={2}
                >
                  Status: {order.status.toUpperCase()}
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default AdminOrders;
