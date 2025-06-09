
import { Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const CustomerSearch = () => {
  const searchBgColor = useColorModeValue("white", "gray.700");
  const searchTextColor = useColorModeValue("black", "white");

  return (
    <InputGroup width="200px" mt="1" mb="1" ml="40">
      <Input
        placeholder="Search..."
        size="sm"
        bg={searchBgColor}
        color={searchTextColor}
        borderRadius="full"
      />
      <InputRightElement mt="-0.5">
        <FaSearch color={useColorModeValue("gray.900", "gray.300")} />
      </InputRightElement>
    </InputGroup>
  );
};

export default CustomerSearch;
