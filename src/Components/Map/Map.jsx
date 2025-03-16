import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Correct import for Leaflet
import "leaflet/dist/leaflet.css";

function Map() {
  // const position = [19.0822, 72.8682]; // Dharavi, Mumbai, India
  const position = [19.0404001, 72.8546677]; // Vivekanand Cooperative Housing Society (your location)

  const highlightedPosition = [19.0404001, 72.8546677]; // Vivekanand Cooperative Housing Society (your location)

  // Custom blue icon for the highlighted marker
  const blueIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Blue_dot.svg", // Blue dot icon URL
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      maxW="500px"
      mx="auto"
      marginTop={25}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        ADDRESS OF THE STORE{" "}
      </Text>
      {/* Ensure the map has enough height for proper rendering */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Main Location Marker */}
        {/* <Marker position={position}>
          <Popup>
            Dharavi, Mumbai
          </Popup> */}
        {/* </Marker> */}
        {/* Highlighted Location Marker with Blue Icon */}
        <Marker position={highlightedPosition}>
          <Popup>Vivekanand Cooperative Housing Society</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

export default Map;
