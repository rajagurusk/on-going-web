import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import initialData from "../assets/Data"; // Importing product data

function AdminProduct() {
  const [products, setProducts] = useState(initialData); // Manage product list
  const [editIndex, setEditIndex] = useState(null); // Track which product is being edited
  const [editForm, setEditForm] = useState({
    itemTitle: "",
    price: "",
    itemImage: "",
  });
  const [newProductForm, setNewProductForm] = useState({
    itemTitle: "",
    price: "",
    itemImage: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control

  // DELETE FUNCTION
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Update state to remove item
  };

  // EDIT FUNCTION - SETS THE SELECTED PRODUCT INTO EDIT MODE
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({
      itemTitle: products[index].itemTitle,
      price: products[index].price,
      itemImage: products[index].itemImage,
    });
  };

  // HANDLE FORM CHANGES
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // SAVE UPDATED DATA
  const handleSave = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], ...editForm };
    setProducts(updatedProducts);
    setEditIndex(null); // Exit edit mode
  };

  // ADD NEW PRODUCT FORM
  const handleNewProductChange = (e) => {
    setNewProductForm({ ...newProductForm, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1, // Generate unique ID for new product
      ...newProductForm,
    };
    setProducts([...products, newProduct]); // Add new product to list
    setNewProductForm({ itemTitle: "", price: "", itemImage: "" }); // Reset form fields
    onClose(); // Close modal after adding product
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="1rem"
      >
        {products.map((item, index) => (
          <GridItem key={item.id} colSpan={1} rowSpan={1}>
            <Box
              width={"100%"}
              height={"100%"}
              overflow={"hidden"}
              marginTop={"2rem"}
            >
              {/* Check if this item is in edit mode */}
              {editIndex === index ? (
                // EDIT FORM
                <VStack alignItems={"flex-start"} spacing={3}>
                  <Input
                    name="itemTitle"
                    value={editForm.itemTitle}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                  <Input
                    name="price"
                    type="number"
                    value={editForm.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                  />
                  <Input
                    name="itemImage"
                    value={editForm.itemImage}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </Button>
                </VStack>
              ) : (
                // NORMAL VIEW
                <VStack alignItems={"flex-start"}>
                  {/* Product Image */}
                  <HStack position={"relative"} overflow={"hidden"}>
                    <Image
                      borderRadius={"20px"}
                      boxSize={"250px"}
                      src={item.itemImage}
                    />
                  </HStack>

                  {/* Product Details */}
                  <VStack alignItems={"flex-start"} spacing={2}>
                    <Text
                      fontWeight={"600"}
                      letterSpacing={"2px"}
                      fontSize={"20px"}
                    >
                      {item.itemTitle}
                    </Text>
                    <Text fontWeight={700}>Rs. {item.price} </Text>

                    {/* Edit & Delete Buttons */}
                    <HStack>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>
              )}
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Add Product Button */}
      {/* Centered Add Product Button */}
      <Flex justifyContent="center" alignItems="center" mt="4rem">
        <Button colorScheme="teal" size="lg" onClick={onOpen}>
          Add Product
        </Button>
      </Flex>

      {/* Modal for Adding New Product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="itemTitle"
              value={newProductForm.itemTitle}
              onChange={handleNewProductChange}
              placeholder="Product Name"
            />
            <Input
              name="price"
              type="number"
              value={newProductForm.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              marginTop="1rem"
            />
            <Input
              name="itemImage"
              value={newProductForm.itemImage}
              onChange={handleNewProductChange}
              placeholder="Image URL"
              marginTop="1rem"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add Product
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminProduct;
