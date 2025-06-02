import { Box, Button, VStack, Heading, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={10}
        rounded="2xl"
        shadow="xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Heading size="lg" mb={2}>
          Welcome!
        </Heading>
        <Text fontSize="md" color="gray.600" mb={6}>
          Please select your role to continue
        </Text>

        <Stack spacing={4}>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => navigate("/admin")}
            _hover={{ bg: "teal.600" }}
          >
            Admin
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate("/customer")}
            _hover={{ bg: "blue.600" }}
          >
            Customer
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SelectRole;
