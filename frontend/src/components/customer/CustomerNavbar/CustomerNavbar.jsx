import {
  Button, Container, Flex, HStack, Text,
  useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GiFallingLeaf } from "react-icons/gi";
import { IoMoonOutline, IoPersonCircleOutline } from "react-icons/io5";
import { RiSunLine } from "react-icons/ri";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import CustomerCategory from './CustomerCategory';
import CustomerSearch from './CustomerSearch';

const CustomerNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [topCategories, setTopCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState({});

  // Lấy categoryId từ URL path hoặc query string
  const currentCategoryId = useMemo(() => {
    if (location.pathname.startsWith("/customer/products/category/")) {
      return location.pathname.split("/").pop();
    } else if (location.pathname.startsWith("/customer/products/search")) {
      return searchParams.get("category");
    }
    return null;
  }, [location, searchParams]);

  // Xác định danh mục gốc đang active (để gạch chân)
  const activeRootId = useMemo(() => {
    if (!currentCategoryId || !topCategories.length) return null;

    const rootMatch = topCategories.find(cat => cat._id === currentCategoryId);
    if (rootMatch) return rootMatch._id;

    for (const root of topCategories) {
      const level2List = categoryTree[root._id] || [];
      for (const level2 of level2List) {
        if (level2._id === currentCategoryId) return root._id;
        if ((level2.children || []).some(child => child._id === currentCategoryId)) {
          return root._id;
        }
      }
    }

    return null;
  }, [currentCategoryId, topCategories, categoryTree]);

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
    const fetchCategoryTree = async (parentId) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/tree-by-parent?parent=${parentId}`);
        const level2 = res.data.data || res.data;

        const level2WithChildren = await Promise.all(
          level2.map(async (cat) => {
            const resL3 = await axios.get(`http://localhost:5000/api/categories/tree-by-parent?parent=${cat._id}`);
            return { ...cat, children: resL3.data.data || [] };
          })
        );

        setCategoryTree(prev => ({ ...prev, [parentId]: level2WithChildren }));
      } catch (err) {
        console.error("Error fetching category tree:", err);
      }
    };

    topCategories.forEach(cat => {
      if (cat._id && !categoryTree[cat._id]) {
        fetchCategoryTree(cat._id);
      }
    });
  }, [topCategories]);

  return (
    <Container
      maxW="100%" px={4} py={1}
      bg={useColorModeValue("white", "gray.900")}
      borderBottom="1px solid"
      borderColor="gray.300"
    >
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
          <Link to="/customer/home" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Cielo <GiFallingLeaf style={{ marginBottom: '-25px', marginLeft: '-20px', fontSize: '1.2em' }} />
          </Link>
        </Text>

        {/* Category Menu */}
        <CustomerCategory
          topCategories={topCategories}
          categoryTree={categoryTree}
          activeRootId={activeRootId}
        />

        {/* Search */}
        <Flex flex="1" justify="flex-start" ml={10}>
          <CustomerSearch categoryId={currentCategoryId} />
        </Flex>

        {/* Actions */}
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
