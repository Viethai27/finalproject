
import { Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate(); 

  return (
    <VStack spacing={4} mt={20}>
      <Heading>Choose your role</Heading>
      
      <Button colorScheme="teal" onClick={() => navigate("/admin")}>
        Admin
      </Button>
      <Button colorScheme="blue" onClick={() => navigate("/customer")}>
        Customer
      </Button>
    </VStack>
  );
};

export default SelectRole;

