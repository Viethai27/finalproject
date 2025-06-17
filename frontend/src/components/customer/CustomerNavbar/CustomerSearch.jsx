import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const CustomerSearch = ({ categoryId = null }) => {
  const searchBgColor = useColorModeValue("white", "gray.700");
  const searchTextColor = useColorModeValue("black", "white");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (categoryId) params.set("category", categoryId);

    navigate(`/customer/products/search?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup width="200px" mt="1" mb="1" ml="40">
      <Input
        placeholder="Search..."
        size="sm"
        bg={searchBgColor}
        color={searchTextColor}
        borderRadius="full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <InputRightElement mt="-0.5">
        <IconButton
          icon={<FaSearch />}
          size="sm"
          variant="ghost"
          onClick={handleSearch}
          aria-label="Search"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default CustomerSearch;
