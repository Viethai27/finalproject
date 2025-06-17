import {
  Text, HStack, Popover, PopoverTrigger, PopoverContent,
  PopoverBody, VStack, Box, useColorModeValue, SimpleGrid
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CustomerCategory = ({ topCategories, categoryTree, activeRootId }) => {
  const navigate = useNavigate();

  const menuTextColor = useColorModeValue("#004C99", "#FFFFFF");
  const popoverBg = useColorModeValue("white", "gray.800");
  const popoverShadow = "md";

  const handleCategoryClick = (categoryId) => {
    navigate(`/customer/products/category/${categoryId}`);
  };

  return (
    <HStack mt="1.5" mb="1.5" ml="-25" spacing={10} justify="center" flex="1" wrap="wrap">
      {topCategories.map(({ name, _id }) => {
        const isActive = activeRootId === _id;

        const level2Categories = categoryTree[_id] || [];

        // Tách các category đặc biệt (ví dụ theo tên)
        const specialNames = ['NEWEST', 'POPULAR THIS MONTH', 'FEATURED'];
        const specialCategories = level2Categories.filter(cat =>
          specialNames.includes(cat.name.toUpperCase())
        );
        const normalCategories = level2Categories.filter(
          cat => !specialNames.includes(cat.name.toUpperCase())
        );

        return (
          <Popover trigger="hover" placement="bottom-start" key={_id} isLazy>
            <PopoverTrigger>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                cursor="pointer"
                position="relative"
                color={isActive ? menuTextColor : "inherit"}
                onClick={() => handleCategoryClick(_id)}
                _after={
                  isActive
                    ? {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '3px',
                        bg: menuTextColor,
                        left: 0,
                        bottom: '-14px',
                      }
                    : {}
                }
                _hover={
                  isActive
                    ? {}
                    : {
                        _after: {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '3px',
                          bg: menuTextColor,
                          left: 0,
                          bottom: '-14px',
                        }
                      }
                }
              >
                {name}
              </Text>
            </PopoverTrigger>

            <PopoverContent borderRadius="md" p={4} bg={popoverBg} boxShadow={popoverShadow} mt="2" minW="700px">
              <PopoverBody>
                <HStack align="start" spacing={10}>
                  {/* Cột 1: Special Categories */}
                  <VStack align="start" spacing={3}>
                    {specialCategories.map(cat => (
                      <Text
                        key={cat._id}
                        fontWeight="bold"
                        textTransform="uppercase"
                        cursor="pointer"
                        onClick={() => handleCategoryClick(cat._id)}
                        _hover={{
                          color: menuTextColor,
                          textDecoration: "underline"
                        }}
                      >
                        {cat.name}
                      </Text>
                    ))}
                  </VStack>

                  {/* Các cột còn lại */}
                  {normalCategories.map(level2 => (
                    <VStack key={level2._id} align="start" spacing={2}>
                      {/* Dòng đầu: level 2 */}
                      <Text
                        fontWeight="bold"
                        textTransform="uppercase"
                        cursor="pointer"
                        onClick={() => handleCategoryClick(level2._id)}
                        _hover={{
                          color: menuTextColor,
                          textDecoration: "underline"
                        }}
                      >
                        {level2.name}
                      </Text>

                      {/* Dòng dưới: level 3 */}
                      {(level2.children || []).map(level3 => (
                        <Text
                          key={level3._id}
                          fontSize="sm"
                          textTransform="capitalize"
                          pl={2}
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
                    </VStack>
                  ))}
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      })}
    </HStack>
  );
};

export default CustomerCategory;
