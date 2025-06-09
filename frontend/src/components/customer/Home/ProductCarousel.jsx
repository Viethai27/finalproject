import { Box, Image, Text, HStack, VStack } from "@chakra-ui/react";

const ProductCarousel = ({ products }) => (
  <HStack spacing={6} overflowX="auto">
    {products.map(product => (
      <VStack key={product.id} w="160px" p={2} bg="gray.50" borderRadius="md">
        <Image src={product.image} alt={product.name} boxSize="120px" objectFit="cover" />
        <Text fontWeight="medium">{product.name}</Text>
        <Text color="gray.600">${product.price}</Text>
      </VStack>
    ))}
  </HStack>
);

export default ProductCarousel;
