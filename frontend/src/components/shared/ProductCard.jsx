import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const bg = useColorModeValue("white", "gray.700");
  const shadow = useColorModeValue("md", "dark-lg");
  const priceColor = useColorModeValue("blue.600", "blue.300");

  const imageUrl = product.images?.[0]?.imageUrl || "https://placehold.co/300x200?text=No+Image";

  return (
    <Box
      bg={bg}
      borderRadius="xl"
      boxShadow={shadow}
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ transform: "scale(1.03)", boxShadow: "xl" }}
      role="group"
    >
      <Box position="relative" w="100%" h="220px" overflow="hidden" bg="gray.100">
        {!imgLoaded && <Skeleton height="220px" width="100%" />}
        <Image
          src={imageUrl}
          alt={product.name || "Product image"}
          objectFit="cover"
          width="100%"
          height="220px"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x200?text=No+Image";
          }}
          fallbackSrc="https://placehold.co/300x200?text=No+Image"
          transition="opacity 0.3s ease"
          opacity={imgLoaded ? 1 : 0}
        />
        {product.isNew && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            colorScheme="green"
            fontWeight="bold"
            fontSize="0.8rem"
            px={2}
            borderRadius="md"
            zIndex={1}
            _groupHover={{ bg: "green.500", color: "white" }}
          >
            New
          </Badge>
        )}
      </Box>

      <VStack align="start" spacing={1} p={4}>
        <Text fontWeight="semibold" fontSize="lg" noOfLines={2} _groupHover={{ color: priceColor }}>
          {product.name}
        </Text>

        <HStack spacing={3} align="center">
          <Text fontWeight="bold" fontSize="xl" color={priceColor}>
            ${product.price.toLocaleString()}
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text as="s" color="gray.400" fontSize="md" fontWeight="medium" userSelect="none">
              ${product.originalPrice.toLocaleString()}
            </Text>
          )}
        </HStack>

        <HStack width="100%" justify="space-between" pt={2}>
          <Button colorScheme="blue" size="sm" flex={1} _groupHover={{ bg: "blue.600" }}>
            Buy now
          </Button>
          <Button size="sm" variant="ghost" colorScheme="blue" aria-label="Add to wishlist">
            <FiHeart />
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductCard;
