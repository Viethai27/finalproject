import { Box, Image, Heading, VStack } from "@chakra-ui/react";
import ProductCarousel from "./ProductCarousel";

const CollectionSection = ({ collection }) => (
  <Box my={10}>
    <Image src={collection.banner} alt={collection.title} borderRadius="md" />
    <VStack align="start" mt={4}>
      <Heading size="md">{collection.title}</Heading>
      <ProductCarousel products={collection.products} />
    </VStack>
  </Box>
);

export default CollectionSection;
