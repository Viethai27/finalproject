import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Link, useLocation } from "react-router-dom";
import { GiFallingLeaf } from "react-icons/gi";
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const showSearch =
    location.pathname.includes("/admin/products") ||
    location.pathname.includes("/admin/collections");

  return (
    <Container
      maxW="100%"
      px={4}
      py={1}
      bg="white"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        wrap="nowrap"
        gap={4}
        minH="50px"
      >
        {/* Logo */}
        <Text
          bgGradient="linear(to-l,rgb(33, 7, 138),rgb(99, 87, 238))"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          mb="-4"
          mt="-4"
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Cielo <Box as={GiFallingLeaf} display="inline" mb={-0.5} ml={-1} color="rgb(38, 6, 169)" />
          </Link>
        </Text>

        {/* Search box or placeholder to preserve height */}
        <Flex flex="1" justify="flex-end">
          <InputGroup width="200px" mt="2" mb="1" visibility={showSearch ? "visible" : "hidden"}>
            <Input
              placeholder="Search..."
              size="sm"
              bg="gray.100"
              color="black"
              borderRadius="full"
            />
            <InputRightElement mt="-0.5" pointerEvents="none">
              <FaSearch color="rgb(60, 50, 170)" />
            </InputRightElement>
          </InputGroup>
        </Flex>

        {/* Action buttons */}
        <HStack spacing={2} mb="1" mt="1">
          <IconButton
            aria-label="User Profile"
            variant="unstyled"
            p="0"
            minW="32px"
            h="32px"
            icon={<FaUserCircle size={26} color="rgb(60, 50, 170)" />}
          />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
