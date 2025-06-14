import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box, Text } from '@chakra-ui/react';

const data = [
  { month: 'Jan', revenue: 40000000 },
  { month: 'Feb', revenue: 55000000 },
  { month: 'Mar', revenue: 47000000 },
  { month: 'Apr', revenue: 60000000 },
  { month: 'May', revenue: 80000000 },
  { month: 'Jun', revenue: 90000000 },
];

const RevenueChart = () => {
  return (
    <Box width="100%" height="300px">
      <Text fontSize="xl" fontWeight="semibold" mb={4}>Monthly Revenue</Text>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} ₫`} />
          <Line type="monotone" dataKey="revenue" stroke="#3182ce" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;