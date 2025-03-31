import React, { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Button, Spinner } from "@chakra-ui/react";
import { db } from "../../Firebase/Firebase"; // Correct path to Firebase config
import { collection, getDocs } from "firebase/firestore";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders"); // Get all user orders from "orders" collection
        const querySnapshot = await getDocs(ordersCollection);
        const allOrders = [];

        querySnapshot.forEach((doc) => {
          const userOrders = doc.data().orders; // Get the orders array for each user
          userOrders.forEach((order) => {
            allOrders.push({ ...order, userEmail: doc.id }); // Add userEmail to each order
          });
        });

        setOrders(allOrders); // Set all orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchAllOrders(); // Call function to fetch all orders
  }, []);

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
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default AdminOrders;
