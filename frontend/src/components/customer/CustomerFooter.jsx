import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.100" color="white" py={10} px={{ base: 4, md: 20 }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        wrap="wrap"
        gap={6}
      >
        <Box color="gray.600">
          <Text fontWeight="bold" fontSize="lg" mb={2}>About Us</Text>
          <Stack spacing={1}>
            <Link href="#">Our Story</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Careers</Link>
          </Stack>
        </Box>

        <Box color="gray.600">
          <Text fontWeight="bold" fontSize="lg" mb={2}>Customer Service</Text>
          <Stack spacing={1}>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Return Policy</Link>
            <Link href="#">FAQs</Link>
          </Stack>
        </Box>

        <Box color="gray.600">
          <Text fontWeight="bold" fontSize="lg" mb={2}>Legal</Text>
          <Stack spacing={1}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
          </Stack>
        </Box>
      </Flex>

      <Text textAlign="center" mt={8} fontSize="sm" color="gray.400">
        © {new Date().getFullYear()} Cielo Vietnam. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
