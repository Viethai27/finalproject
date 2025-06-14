import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductTableRow from "../../components/admin/Product/ProductTableRow";

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (search = "") => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products", {
        params: search ? { search } : {},
      });

      const productsData =
        Array.isArray(res.data?.data) ? res.data.data : [];

      console.log("Fetched products:", productsData);
      setProducts(productsData);
    } catch (err) {
      console.error("Failed to load products", err);
      toast({
        title: "Error loading products.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast({
        title: "Product deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      toast({
        title: "Failed to delete product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchProducts(searchTerm);
    }
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Product Management
        </Text>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => navigate("/admin/addproducts")}
        >
          Add Product
        </Button>
      </Flex>

      <InputGroup mb={4}>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>

      {loading ? (
        <Flex justify="center" mt={8}>
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Total Sold</Th>
              <Th>Created At</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  No products found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ProductManagementPage;
