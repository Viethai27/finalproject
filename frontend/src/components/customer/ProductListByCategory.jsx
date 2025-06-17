import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../shared/ProductList";

const ProductByCategory = ({ categoryId, specialType, parentId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (specialType) {
          // Gọi API đặc biệt, truyền parentId nếu có
          let url = `http://localhost:5000/api/products/by-special-category/${specialType}`;
          if (parentId) url += `?parentId=${parentId}`;
          res = await axios.get(url);
        } else if (categoryId) {
          // Gọi API theo category thường
          res = await axios.get(`http://localhost:5000/api/products/by-category/${categoryId}`);
        } else {
          setProducts([]);
          return;
        }
        const rawProducts = res.data.data || [];

        // Lấy ảnh cho từng sản phẩm
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
              return {
                ...product,
                image: null,
              };
            }
          })
        );

        setProducts(productsWithImages);
      } catch (err) {
        setProducts([]);
      }
    };

    if (specialType || categoryId) fetchProducts();
  }, [categoryId, specialType, parentId]);

  return <ProductList products={products} />;
};

export default ProductByCategory;
