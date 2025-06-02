// src/layouts/AdminLayout.jsx
import { Box, Flex, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminFooter from "../components/admin/AdminFooter";
import AdminSidebar from "../components/admin/AdminSidebar";
const sidebarLinks = [
  { label: "Dashboard", path: "/admin" },
  { label: "Category Management", path: "/admin/categories" },
  { label: "Product Management", path: "/admin/products" },
  { label: "Collection Management", path: "/admin/collections" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Flex direction="column" minH="100vh">

      <AdminNavbar />

      <Flex flex="1">
        <AdminSidebar/>
        <Box flex="1" p={6} bg="white">
          <Outlet />
        </Box>
      </Flex>

      {/* Footer */}
      <AdminFooter />
    </Flex>
  );
};

export default AdminLayout;
