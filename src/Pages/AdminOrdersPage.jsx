import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { db } from "../Firebase/Firebase"; // import firebase setup
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore imports

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders"); // 'orders' is the collection where orders are stored
        const q = query(ordersRef, where("paymentStatus", "==", "successful")); // Filter orders with successful payment status
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
        Orders with Successful Payment
      </Text>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <VStack spacing={4}>
          {orders.map((order) => (
            <Box
              key={order.id}
              borderWidth="1px"
              borderRadius="md"
              padding="1rem"
              width="100%"
              boxShadow="sm"
            >
              <Text fontSize="lg" fontWeight="bold">{`Order ID: ${order.id}`}</Text>
              <Text>{`Customer Name: ${order.customerName}`}</Text>
              <Text>{`Items: ${order.items.map(item => item.name).join(", ")}`}</Text>
              <Text>{`Total: $${order.totalAmount}`}</Text>
              <Text>{`Payment Status: ${order.paymentStatus}`}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default AdminOrdersPage;
