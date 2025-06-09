import { Box, Text, Heading, Button, Image, Stack } from "@chakra-ui/react";

const HeroBanner = ({ image, title, subtitle, cta }) => (
  <Box position="relative" h="400px" bg="gray.100">
    <Image src={image} objectFit="cover" w="100%" h="100%" />
    <Box position="absolute" top="50%" left="10%" transform="translateY(-50%)" color="white">
      <Stack spacing={4}>
        <Heading size="2xl">{title}</Heading>
        <Text fontSize="xl">{subtitle}</Text>
        <Button colorScheme="teal" size="lg">{cta}</Button>
      </Stack>
    </Box>
  </Box>
);

export default HeroBanner;
