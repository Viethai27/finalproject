import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { GiFallingLeaf } from "react-icons/gi";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Category Management", path: "/admin/categories" },
    { label: "Product Management", path: "/admin/products" },
    { label: "Collection Management", path: "/admin/collections" },
  ];

  return (
    <Box
      w="64"
      bg="white"
      minH="100vh"
      p={4}
      mt="50"
    >
      <Text
        fontSize="lg"
        fontWeight="extrabold"
        mb={4}
        bgColor="rgb(60, 50, 170)"
        bgClip="text"
      >
        Admin Panel 
      </Text>

      <VStack align="stretch" spacing={2}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Button
              as={Link}
              to={link.path}
              key={link.path}
              justifyContent="flex-start"
              variant="ghost"
              size="md"
              fontWeight={isActive ? "bold" : "normal"}
              color={isActive ? "rgb(51, 20, 176)" : "rgb(35, 72, 196)"}
              _hover={{ bg: "gray.100" }}
              bg="transparent"
              _active={{ bg: "transparent" }} 
              _focus={{ boxShadow: "none" }}
              borderRadius="md"
            >
              {link.label}
            </Button>
          );
        })}
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
