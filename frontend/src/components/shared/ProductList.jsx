import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!Array.isArray(products)) return null; 

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6} p={4}>
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
