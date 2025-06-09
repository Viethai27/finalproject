import {
  Button, Container, Flex, HStack, Text, Input,
  useColorMode, useColorModeValue,
  InputGroup, InputRightElement
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

import CustomerCategory from './CustomerCategory';
import CustomerSearch from './CustomerSearch';

const CustomerNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchBgColor = useColorModeValue("white", "gray.700");
  const searchTextColor = useColorModeValue("black", "white");
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

  return (
    <Container maxW="100%" px={4} py={1} bg={useColorModeValue("White", "gray.900")} borderBottom="1px solid" borderColor="gray.300">
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

        {/* Category Menu  */}
        <CustomerCategory topCategories={topCategories} categoryTree={categoryTree} />

        {/* Search Box */}
        <Flex flex="1" justify="flex-start" ml={10}>
          <CustomerSearch />
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
