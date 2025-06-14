import { Box, HStack, Avatar, VStack, Text } from '@chakra-ui/react';

const topProducts = [
  { id: 1, name: 'Cotton T-Shirt', sold: 134, image: 'https://i5.walmartimages.com/seo/Hanes-5180-Beefy-T-100-Cotton-T-Shirt_c7c023ae-1f32-4e2b-b309-006e0331b9bb_1.f7f19c04819691e60557e9e26773b736.jpeg' },
  { id: 2, name: 'Women Jeans', sold: 98, image: 'https://assets.vogue.com/photos/605ba284f82d59f443b8390a/master/w_2560,c_limit/VO0420_CoverStory_01.jpg' },
  { id: 3, name: 'White Shirt', sold: 87, image: 'https://th.bing.com/th/id/R.8e91064ba9cdf7b3b526122c59151b68?rik=a8%2bwZyNejnMphw&riu=http%3a%2f%2ftextilefocus.com%2fwp-content%2fuploads%2f2016%2f10%2f1-Solid-White-T-Shirt.jpg&ehk=xTtwJfuOhIDpKIcT3vRmr8bCxRjpysSMZTSPyd9yWP4%3d&risl=&pid=ImgRaw&r=0' },
  { id: 4, name: 'Floral Maxi Dress', sold: 76, image: 'https://th.bing.com/th/id/R.8cdfd5d8e3bc61e01946d886acb032ca?rik=GSrydEu9CBEEJw&riu=http%3a%2f%2fcdn.freewebstore.com%2forigin%2f242369%2ffloral_dress.jpg&ehk=NyBXjhmjVbM%2f6Fzv33ERyRy3w8p9liWom1x6B2eZVRA%3d&risl=&pid=ImgRaw&r=0' },
];

const TopSellingProducts = () => {
  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Top Selling Products
      </Text>
      <VStack align="stretch" spacing={4}>
        {topProducts.map((product) => (
          <HStack key={product.id} spacing={4}>
            <Avatar src={product.image} size="md" />
            <Box>
              <Text fontWeight="medium">{product.name}</Text>
              <Text fontSize="sm" color="gray.500">
                Sold: {product.sold}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default TopSellingProducts;
