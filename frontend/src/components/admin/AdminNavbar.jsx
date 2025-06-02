import {
  Button, Container, Flex, HStack, Text, Input,
  useColorMode, useColorModeValue,
  InputGroup, InputRightElement
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { GiFallingLeaf } from "react-icons/gi";
import { IoMoonOutline, IoPersonCircleOutline } from "react-icons/io5";
import { RiSunLine } from "react-icons/ri";
import { FaSearch } from 'react-icons/fa';
import { FiHeart } from "react-icons/fi";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchBgColor = useColorModeValue("gray.300", "gray.700");
  const searchTextColor = useColorModeValue("black", "white");

  return (
    <Container maxW="100%" px={4} py={1} bg={useColorModeValue("gray.200", "gray.900")}>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap" gap={4}>
        {/* Logo */}
        <Text
          bgGradient="linear(to-l,rgb(33, 7, 138),rgb(99, 87, 238))"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          mb="-3"
          mt="-4"
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Cielo <GiFallingLeaf style={{ marginBottom: '-25px', marginLeft: '-20px', fontSize: '1.2em' }} />
          </Link>
        </Text>

        {/* Search box */}
        <Flex flex="1" justify="flex-start">
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
        </Flex>

        {/* Action buttons */}
        <HStack spacing={2}>
          <Button onClick={toggleColorMode} variant="ghost" aria-label="Toggle Color Mode">
            {colorMode === "light" ? <IoMoonOutline /> : <RiSunLine />}
          </Button>
          <Button variant="ghost" aria-label="User Profile"><IoPersonCircleOutline /></Button>
          <Button variant="ghost" aria-label="Wishlist"><FiHeart /></Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
