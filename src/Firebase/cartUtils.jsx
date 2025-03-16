// Firebase/cartUtils.js

import { db, auth } from "./Firebase"; // Assuming you've exported db and auth from your Firebase config

// Save cart to Firebase Firestore
export const saveCartToFirebase = async (cartItems) => {
  if (auth.currentUser) {
    const cartRef = db.collection('users').doc(auth.currentUser.uid).collection('cart');
    try {
      // Clear the current cart before saving new items
      await cartRef.get().then(snapshot => {
        snapshot.forEach(doc => doc.ref.delete()); // Delete existing cart items
      });

      // Add new items to the cart collection
      cartItems.forEach((item) => {
        cartRef.doc(item.id).set(item); // Save item with its id as docId
      });
    } catch (error) {
      console.error("Error saving cart to Firestore:", error);
    }
  }
};

// Get cart from Firestore
export const getCartFromFirebase = async () => {
  if (auth.currentUser) {
    const cartRef = db.collection('users').doc(auth.currentUser.uid).collection('cart');
    const cartSnapshot = await cartRef.get();
    const cartData = cartSnapshot.docs.map(doc => doc.data());
    return cartData;
  }
  return [];
};
