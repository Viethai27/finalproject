import { Box, SimpleGrid } from "@chakra-ui/react";
import RevenueChart from "../../components/admin/DashBoard/RevenueChart";
import RecentOrders from "../../components/admin/DashBoard/RecentOrders";
import TopSellingProducts from "../../components/admin/DashBoard/TopSellingProducts";
const Dashboard = () => {
  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <Box bg="white" p={6} borderRadius="xl" boxShadow="md" h="380px" >
          <RevenueChart />
        </Box>
        <TopSellingProducts />
      </SimpleGrid>
      <RecentOrders />
    </Box>
  );
};

export default Dashboard;