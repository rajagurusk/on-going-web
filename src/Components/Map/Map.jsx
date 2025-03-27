import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const position = [19.0404001, 72.8546677]; // Vivekanand Cooperative Housing Society
  
  const googleMapsLink =
    "https://www.google.com/maps/place/Dharavi+Vivekananda+Cooperative+Housing+Society+Limited,+Aayush+Hospital,+90+Feet+Rd,+Muslim+Nagar,+RP+Nagar,+Dharavi,+Mumbai,+Maharashtra+400017/@19.0404052,72.8520928,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c8d453c3739f:0x155eed1a753f95c9!8m2!3d19.0404001!4d72.8546677!16s%2Fg%2F12hlzbn2g?entry=ttu&g_ep=EgoyMDI1MDMyNS4wIKXMDSoASAFQAw%3D%3D";

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
        ADDRESS OF THE STORE
      </Text>

      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position}>
          <Popup>
            Vivekanand Cooperative Housing Society
            <br />
            <Link href={googleMapsLink} color="blue.500" isExternal>
              Open in Google Maps
            </Link>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

export default Map;
