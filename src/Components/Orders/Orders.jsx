import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, HStack, Spinner } from "@chakra-ui/react";
import { db } from "../../Firebase/Firebase"; // go up 1 level to src/Components
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem("userEmail"); // Get user email from sessionStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderRef = doc(db, "orders", userEmail); // Reference to the orders document using user email
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          setOrders(orderSnapshot.data().orders || []); // Set orders if they exist
        } else {
          setOrders([]); // If no orders found, set an empty array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, [userEmail]); // Re-run when userEmail changes

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading your orders...</Text>
      </Box>
    );
  }

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        Your Orders
      </Text>

      {orders.length === 0 ? (
        <Text>No orders found!</Text>
      ) : (
        <VStack spacing={4} align="normal">
          {orders.map((order) => (
            <Box
              key={order.id}
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

export default Orders;
