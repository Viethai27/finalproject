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

  // Hàm tìm categoryId theo slug (từ categoryTree + topCategories)
  const findCategoryIdBySlug = (slug) => {
    // Tìm trong topCategories
    const foundTop = topCategories.find(cat => cat.slug === slug);
    if (foundTop) return foundTop._id;

    // Tìm trong categoryTree (2 cấp)
    for (const key in categoryTree) {
      const level2List = categoryTree[key];
      for (const level2 of level2List) {
        if (level2.slug === slug) return level2._id;
        if (level2.children) {
          const foundLevel3 = level2.children.find(child => child.slug === slug);
          if (foundLevel3) return foundLevel3._id;
        }
      }
    }
    return null;
  };

  const handleCategoryClick = (slug) => {
    // Dùng slug làm URL, nhưng khi cần gọi API sẽ map sang id
    navigate(`/customer/products/category/${slug}`);
  };

  return (
    <HStack mt="1.5" mb="1.5" ml="-25" spacing={10} justify="center" flex="1" wrap="wrap">
      {topCategories.map(({ name, _id, slug }) => (
        <Popover trigger="hover" placement="bottom-start" key={_id} isLazy>
          <PopoverTrigger>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              cursor="pointer"
              position="relative"
              onClick={() => handleCategoryClick(slug)}
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
                      onClick={() => handleCategoryClick(level2.slug)}
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
                        onClick={() => handleCategoryClick(level3.slug)}
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
