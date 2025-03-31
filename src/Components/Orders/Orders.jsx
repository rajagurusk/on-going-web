import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Spinner,
  Badge,
  Image,
} from "@chakra-ui/react";
import { db } from "../../Firebase/Firebase"; // Ensure correct Firebase path
import { doc, getDoc } from "firebase/firestore";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem("userEmail"); // Get user email from sessionStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userEmail) {
          setLoading(false);
          return;
        }

        const orderRef = doc(db, "orders", userEmail);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          setOrders(orderSnapshot.data().orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

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

              {/* Order Status with Color-Coded Badge */}
              <HStack mt={2}>
                <Text fontWeight="bold">Status:</Text>
                <Badge
                  colorScheme={
                    order.status === "delivered"
                      ? "green"
                      : order.status === "shipped"
                      ? "orange"
                      : "blue"
                  }
                  fontSize="md"
                  p={1}
                  borderRadius="md"
                >
                  {order.status ? order.status.toUpperCase() : "ORDERED"}
                </Badge>
              </HStack>

              <VStack spacing={2} mt={4} align="start">
                <Text fontWeight="bold">Items:</Text>
                <HStack spacing={6} wrap="wrap" align="start">
                  {" "}
                  {/* 👈 Wrap products horizontally */}
                  {order.items.map((item, index) => (
                    <Box
                      key={index}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      {/* ✅ Display Product Image */}
                      <Image
                        src={item.itemImage} // Ensure the image URL exists
                        alt={item.itemTitle}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      {/* <HStack> */}
                      <VStack align="start" spacing={1} mt={2}>
                        <Text fontWeight="bold">{item.itemTitle}</Text>
                        <Text>Price: Rs. {item.price}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </VStack>
                      {/* </HStack> */}
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default Orders;