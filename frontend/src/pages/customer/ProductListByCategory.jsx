import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/shared/ProductList';
import CustomerNavbar from '../../components/customer/CustomerNavbar/CustomerNavbar';

const ProductListByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsWithImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/by-category/${categoryId}`);
        const products = res.data.data || [];

        const enrichedProducts = await Promise.all(
          products.map(async (product) => {
            try {
              const imageRes = await axios.get(`http://localhost:5000/api/product-images/${product._id}/images`);
              const images = imageRes.data.data;
              return {
                ...product,
                image: images.length > 0 ? images[0].imageUrl : null,
              };
            } catch (imageErr) {
              console.error(`Error fetching image for product ${product._id}:`, imageErr);
              return { ...product, image: null };
            }
          })
        );

        setProducts(enrichedProducts);
      } catch (err) {
        console.error("Failed to fetch products by category:", err);
      }
    };

    if (categoryId) fetchProductsWithImages();
  }, [categoryId]);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default ProductListByCategory;
