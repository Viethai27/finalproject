import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminFooter from "../components/admin/AdminFooter";

const NAVBAR_HEIGHT = "60px";
const FOOTER_HEIGHT = "60px";

const AdminLayout = () => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Navbar cố định */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        height={NAVBAR_HEIGHT}
        zIndex="1000"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        <AdminNavbar />
      </Box>

      {/* Content area: Sidebar + Main Content */}
      <Flex flex="1" pt={NAVBAR_HEIGHT}>
        {/* Sidebar */}
        <Box
          width="300px"
          borderRight="1px solid"
          borderColor="gray.300"
          bg="white"
          overflowY="auto"
        >
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box
          flex="1"
          p={6}
          overflowY="auto"
          bg="white"
          minHeight={`calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})`}
        >
          <Outlet />
        </Box>
      </Flex>

      {/* Footer */}
      <Box
        height={FOOTER_HEIGHT}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.300"
      >
        <AdminFooter />
      </Box>
    </Flex>
  );
};

export default AdminLayout;
