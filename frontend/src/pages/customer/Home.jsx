import { Box, Heading, Container, Divider } from "@chakra-ui/react";
import HeroBanner from "../../components/customer/Home/HeroBanner";
import ProductCarousel from "../../components/customer/Home/ProductCarousel";
import CollectionSection from "../../components/customer/Home/CollectionSection";

const Home = () => {
  const meta = {
    hero: {
      image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg",
      title: "New Season is Here",
      subtitle: "Discover the latest trends",
      cta: "Shop Now"
    },
    bestSellers: [
      { id: "p1", name: "Basic Tee", price: 29.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_banner_snippet_d_ff1bf28215.jpg" },
      { id: "p2", name: "Summer Dress", price: 49.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_banner_snippet_d_ff1bf28215.jpg" }
    ],
    newArrivals: [
      { id: "p3", name: "Slim Fit Jeans", price: 59.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" },
      { id: "p4", name: "Casual Shirt", price: 39.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" }
    ],
    collections: [
      {
        id: "c1",
        title: "Men's Collection",
        banner: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg",
        products: [
          { id: "p5", name: "Men Jacket", price: 79.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" },
          { id: "p6", name: "Men Shirt", price: 49.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" }
        ]
      },
      {
        id: "c2",
        title: "Women's Collection",
        banner: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg",
        products: [
          { id: "p7", name: "Women Dress", price: 59.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" },
          { id: "p8", name: "Women Coat", price: 99.99, image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/global_rc_female_soccer_summer_digital_stories_fw25_launch_plp_group_media_image2_asset_d_0070bb0cb1.jpg" }
        ]
      }
    ]
  };

  return (
    <Box>
      <HeroBanner
        image={meta.hero.image}
        title={meta.hero.title}
        subtitle={meta.hero.subtitle}
        cta={meta.hero.cta}
      />

      <Container maxW="7xl" my={10}>
        <Heading size="lg" mb={4}>Best Sellers</Heading>
        <ProductCarousel products={meta.bestSellers} />
      </Container>

      <Container maxW="7xl" my={10}>
        <Heading size="lg" mb={4}>New Arrivals</Heading>
        <ProductCarousel products={meta.newArrivals} />
      </Container>

      <Divider my={8} />

      {meta.collections.map((collection) => (
        <CollectionSection key={collection.id} collection={collection} />
      ))}
    </Box>
  );
};

export default Home;
