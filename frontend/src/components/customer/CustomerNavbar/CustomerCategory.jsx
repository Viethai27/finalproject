import {
  Text, HStack, Popover, PopoverTrigger, PopoverContent,
  PopoverBody, VStack, Box, useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CustomerCategory = ({ topCategories, categoryTree }) => {
  const navigate = useNavigate();
  const menuTextColor = useColorModeValue("#004C99", "#FFFFFF");
  const popoverBg = useColorModeValue("white", "gray.800");
  const popoverShadow = "md";

  const handleCategoryClick = (categoryId) => {
    navigate(`/customer/products/category/${categoryId}`);
  };

  return (
    <HStack mt="1.5" mb="1.5" ml="-25" spacing={10} justify="center" flex="1" wrap="wrap">
      {topCategories.map(({ name, _id }) => (
        <Popover trigger="hover" placement="bottom-start" key={_id} isLazy>
          <PopoverTrigger>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              cursor="pointer"
              position="relative"
              onClick={() => handleCategoryClick(_id)}
              _hover={{
                _after: {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '3px',
                  bg: menuTextColor,
                  left: 0,
                  bottom: '-14px'
                }
              }}
            >
              {name}
            </Text>
          </PopoverTrigger>
          <PopoverContent borderRadius="md" p={4} bg={popoverBg} boxShadow={popoverShadow} mt="2">
            <PopoverBody>
              <VStack align="start" spacing={3}>
                {(categoryTree[name] || []).map(level2 => (
                  <Box key={level2._id}>
                    <Text
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="md"
                      cursor="pointer"
                      onClick={() => handleCategoryClick(level2._id)}
                      _hover={{
                        color: menuTextColor,
                        textDecoration: "underline"
                      }}
                    >
                      {level2.name}
                    </Text>

                    {(level2.children || []).map(level3 => (
                      <Text
                        textTransform="capitalize"
                        key={level3._id}
                        fontSize="sm"
                        pl={4}
                        cursor="pointer"
                        onClick={() => handleCategoryClick(level3._id)}
                        _hover={{
                          color: menuTextColor,
                          textDecoration: "underline"
                        }}
                      >
                        {level3.name}
                      </Text>
                    ))}
                  </Box>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
    </HStack>
  );
};

export default CustomerCategory;
