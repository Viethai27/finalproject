import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../shared/ProductList";

const ProductByCategory = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Lấy danh sách sản phẩm theo category
        const res = await axios.get(`http://localhost:5000/api/products/by-category/${categoryId}`);
        const rawProducts = res.data.data || [];

        // Với mỗi sản phẩm, gọi API để lấy ảnh
        const productsWithImages = await Promise.all(
          rawProducts.map(async (product) => {
            try {
              const imageRes = await axios.get(
                `http://localhost:5000/api/product-images/${product._id}/images`
              );
              const images = imageRes.data.data || [];

              return {
                ...product,
                image: images[0]?.imageUrl || null,
              };
            } catch (error) {
              console.error("Error fetching images for product", product._id, error);
              return {
                ...product,
                image: null,
              };
            }
          })
        );

        setProducts(productsWithImages);
      } catch (err) {
        console.error("Error fetching products by category:", err);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId]);

  return <ProductList products={products} />;
};

export default ProductByCategory;
