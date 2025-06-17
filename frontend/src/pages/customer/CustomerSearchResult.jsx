import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import ProductList from "../../components/shared/ProductList";
import SortFilter from "../../components/customer/SortFilter";

const CustomerSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState(""); // Mặc định không sắp xếp

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search`, {
          params: {
            keyword,     
            categoryId: category,
            sort: sortOption,
          },
        });
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
      setLoading(false);
    };

    if (keyword || category) {
      fetchSearchResults();
    }
  }, [keyword, category, sortOption]);

  return (
    <Box p={4}>
      <Heading size="md" mb={3}>
        Search results for: "{keyword}"
      </Heading>

      {/* Bộ lọc sắp xếp */}
      <SortFilter sortOption={sortOption} setSortOption={setSortOption} />

      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <Text>No matching products found.</Text>
      ) : (
        <ProductList products={products} />
      )}
    </Box>
  );
};

export default CustomerSearchResult;
