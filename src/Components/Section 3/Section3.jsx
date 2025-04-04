import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Section3Cards from "./Section3Cards";

function Section3() {
  return (
    <Box
      width={"100%"}
      min-height={"100vh"}
      // backgroundColor={'yellowgreen'}
      marginTop={"5rem"}
    >
      <VStack width={"100%"} height={"100%"} flexWrap={"wrap"}>
        <VStack>
          <HStack>
            <Text
              fontSize={["25px", "40px"]}
              fontWeight={"600"}
              letterSpacing={"2px"}
            >
              Fruits & Vegetables
            </Text>
          </HStack>

          <HStack>
            <Text
              width={"60%"}
              margin={"auto"}
              textAlign={"center"}
              marginTop={"1rem"}
            >
              Dorem is very painful, he will be pursued by the coaching team,
              but I do At such a time they fall into great labor and pain.
            </Text>
          </HStack>
        </VStack>

        <HStack
          width={"95%"}
          height={"100%"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Section3Cards />
        </HStack>
      </VStack>
    </Box>
  );
}

export default Section3;
