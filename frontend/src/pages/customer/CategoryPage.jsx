import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Box, Text } from "@chakra-ui/react";
import ProductByCategory from "../../components/customer/ProductListByCategory";

const CategoryPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
        setCategoryName(res.data.name);
      } catch (err) {
        console.error("Error loading category by ID", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {categoryName || "Category"}
      </Text>
      <ProductByCategory categoryId={id} />
    </Box>
  );
};

export default CategoryPage;
