// src/components/customer/CustomerLayout.tsx

import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../components/customer/CustomerNavbar/CustomerNavbar";
import Footer from "../components/customer/CustomerFooter";

const NAVBAR_HEIGHT = "49px";
const FOOTER_HEIGHT = "80px";

const CustomerLayout = () => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Navbar */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        height={NAVBAR_HEIGHT}
        zIndex="999"
        bg="white"
      >
        <CustomerNavbar />
      </Box>

      {/* Main ContentContent */}
      <Box
        flex="1"
        pt={NAVBAR_HEIGHT}
        pb={FOOTER_HEIGHT}
        px={{ base: 4, md: 8 }}
        bg="white"
        minHeight={`calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})`}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        height={FOOTER_HEIGHT}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.300"
        mt="auto"
      >
        <Footer />
      </Box>
    </Flex>
  );
};

export default CustomerLayout;
