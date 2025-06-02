import { Box, Text, Flex } from "@chakra-ui/react";

const AdminFooter = () => {
  return (
    <Box as="footer" w="full" py={4} px={6} bg="gray.100" mt="auto">
      <Flex justify="space-between" align="center" fontSize="sm" color="gray.600">
        <Text>© 2025 Fashion Admin. All rights reserved.</Text>
        <Text>v1.0.0</Text>
      </Flex>
    </Box>
  );
};

export default AdminFooter;
