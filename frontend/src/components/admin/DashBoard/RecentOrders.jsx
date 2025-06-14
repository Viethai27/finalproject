import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const orders = [
  { id: 'ORD001', customer: 'Nguyen Van A', date: '2025-06-11', total: 450000 },
  { id: 'ORD002', customer: 'Tran Thi B', date: '2025-06-10', total: 320000 },
  { id: 'ORD003', customer: 'Pham Van C', date: '2025-06-09', total: 610000 },
  { id: 'ORD004', customer: 'Le Thi D', date: '2025-06-08', total: 280000 },
  { id: 'ORD005', customer: 'Hoang Van E', date: '2025-06-07', total: 780000 },
];

const RecentOrders = () => {
  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="md">
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Recent Orders
      </Text>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.date}</Td>
              <Td isNumeric>{order.total.toLocaleString()} ₫</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RecentOrders;