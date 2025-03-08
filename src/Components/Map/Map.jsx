import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    const position = [19.0822, 72.8682]; // Dharavi, Mumbai, India

  return (
    <Box p={5} borderWidth="1px" borderRadius="md" boxShadow="md" maxW="500px" mx="auto" marginTop={25}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Map of Dharavi 
      </Text>
      {/* Ensure the map has enough height for proper rendering */}
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A sample marker.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

export default Map;
