import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Spinner } from "@chakra-ui/react";
import ProductList from "../../components/shared/ProductList";
import SortFilter from "../../components/customer/SortFilter";

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(""); // Thêm state sortOption

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
        const category = res.data.data;
        setCategoryInfo(category);

        let productRes;
        if (category.isSpecial) {
          // Special category:
          let url = `http://localhost:5000/api/products/special/${category.specialType}?parentId=${category.parent}`;
          if (sortOption) {
            url += `&sort=${sortOption}`;
          }
          productRes = await axios.get(url);
        } else {
          // Normal category:
          let url = `http://localhost:5000/api/products/by-category/${id}`;
          if (sortOption) {
            url += `?sort=${sortOption}`;
          }
          productRes = await axios.get(url);
        }

        setProducts(productRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategoryAndProducts();
  }, [id, sortOption]);  // khi sortOption đổi sẽ tự fetch lại

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={6}>
      <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
      <ProductList products={products} />
    </Box>
  );
};

export default CategoryPage;
