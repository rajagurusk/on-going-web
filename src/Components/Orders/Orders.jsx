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
import Map from "../Map/Map"; // Existing interactive map
import SmallMap from "../Map/SmallMap"; // New small static map

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
          const fetchedOrders = orderSnapshot.data().orders || [];

          // Sort orders by date in descending order (newest first)
          const sortedOrders = fetchedOrders.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          setOrders(sortedOrders);
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
      <Text fontSize="2xl" fontWeight="bold">Your Orders</Text>

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
              <Text fontSize="xl" fontWeight="600">Order ID: {order.id}</Text>
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
                      : order.status === "accepted"
                      ? "blue"
                      : "gray"
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
                  {order.items.map((item, index) => (
                    <Box
                      key={index}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <Image
                        src={item.itemImage}
                        alt={item.itemTitle}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" spacing={1} mt={2}>
                        <Text fontWeight="bold">{item.itemTitle}</Text>
                        <Text>Price: Rs. {item.price}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </VStack>
                    </Box>
                  ))}
                </HStack>
              </VStack>

              {/* Display Small Map if Order is Accepted */}
              {order.status === "accepted" && <SmallMap />}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default Orders;
