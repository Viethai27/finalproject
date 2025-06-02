import { Box, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Category Management", path: "/admin/categories" },
    { label: "Product Management", path: "/admin/products" },
    { label: "Collection Management", path: "/admin/collections" },
  ];

  return (
    <Box w="64" bg="gray.100" minH="100vh" p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Admin Panel
      </Text>
      <VStack align="start" spacing={3}>
        {links.map((link) => (
          <ChakraLink
            as={Link}
            to={link.path}
            fontWeight={location.pathname === link.path ? "bold" : "normal"}
            color={location.pathname === link.path ? "teal.500" : "gray.700"}
            _hover={{ textDecoration: "underline" }}
            key={link.path}
          >
            {link.label}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
