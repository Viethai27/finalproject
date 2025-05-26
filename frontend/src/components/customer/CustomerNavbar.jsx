import {
  Button, Container, Flex, HStack, Text, Input,
  useColorMode, useColorModeValue,
  InputGroup, InputRightElement,
  Popover, PopoverTrigger, PopoverContent, PopoverBody,
  Box, VStack
} from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { GiFallingLeaf } from "react-icons/gi";
import { IoMoonOutline } from "react-icons/io5";
import { RiSunLine } from "react-icons/ri";
import { FaSearch } from 'react-icons/fa';
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const menuTextColor = useColorModeValue("#004C99", "#FFFFFF");
  const searchBgColor = useColorModeValue("gray.300", "gray.700");
  const searchTextColor = useColorModeValue("black", "white");
  const popoverBg = useColorModeValue("white", "gray.800");
  const popoverShadow = "md";
  const navigate = useNavigate();

  const [topCategories, setTopCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState({});

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories/roots');
        const data = res.data.data || res.data;
        setTopCategories(data);
      } catch (err) {
        console.error("Error fetching top-level categories:", err);
      }
    };
    fetchTopCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryTree = async (parentId, categoryName) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/tree-by-parent?parent=${parentId}`);
        const level2 = res.data.data || res.data;

        const level2WithChildren = await Promise.all(
          level2.map(async (cat) => {
            const resL3 = await axios.get(`http://localhost:5000/api/categories/tree-by-parent?parent=${cat._id}`);
            return { ...cat, children: resL3.data.data || [] };
          })
        );

        setCategoryTree(prev => ({ ...prev, [categoryName]: level2WithChildren }));
      } catch (err) {
        console.error("Error fetching category tree:", err);
      }
    };

    topCategories.forEach(cat => {
      if (cat._id && cat.name && !categoryTree[cat.name]) {
        fetchCategoryTree(cat._id, cat.name);
      }
    });
  }, [topCategories]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/category/${categoryId}`);
  };

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

        {/* Category Menu */}
        <HStack mt="1.5" mb="1.5" ml="-25" spacing={10} justify="center" flex="1" wrap="wrap">
          {topCategories.map(({ name, _id }) => (
            <Popover trigger="hover" placement="bottom-start" key={_id} isLazy>
              <PopoverTrigger>
                <Text
                  fontWeight="bold"
                  cursor="pointer"
                  position="relative"
                  onClick={() => handleCategoryClick(_id)}
                  _hover={{
                    _after: {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      bg: menuTextColor,
                      left: 0,
                      bottom: '-13px'
                    }
                  }}
                >
                  {name}
                </Text>
              </PopoverTrigger>
              <PopoverContent borderRadius="md" p={4} bg={popoverBg} boxShadow={popoverShadow} mt="2">
                <PopoverBody>
                  <VStack align="start" spacing={3}>
                    {(categoryTree[name] || []).map(level2 => (
                      <Box key={level2._id}>
                        <Text
                          fontWeight="bold"
                          fontSize="md"
                          cursor="pointer"
                          onClick={() => handleCategoryClick(level2._id)}
                           _hover={{
                                color: menuTextColor,
                                textDecoration: "underline"
                             }}
                        >
                          {level2.name}
                        </Text>
                        {(level2.children || []).map(level3 => (
                          <Text
                            key={level3._id}
                            fontSize="sm"
                            pl={4}
                            cursor="pointer"
                            onClick={() => handleCategoryClick(level3._id)}
                             _hover={{
                                color: menuTextColor,
                                textDecoration: "underline"
                             }}
                          >
                            {level3.name}
                          </Text>
                        ))}
                      </Box>
                    ))}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ))}
        </HStack>

        {/* Search Box */}
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

        {/* Action Buttons */}
        <HStack spacing={2}>
          <Button onClick={toggleColorMode} variant="ghost" aria-label="Toggle Color Mode">
            {colorMode === "light" ? <IoMoonOutline /> : <RiSunLine />}
          </Button>
          <Button variant="ghost" aria-label="User Profile"><IoPersonCircleOutline /></Button>
          <Button variant="ghost" aria-label="Wishlist"><FiHeart /></Button>
          <Button variant="ghost" aria-label="Shopping Cart"><FiShoppingCart /></Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default CustomerNavbar;