import { Box, Flex, Text, IconButton, Spacer, useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const specialCategoryNames = ['FEATURED', 'POPULAR THIS MONTH', 'NEWEST'];

const CategoryTree = ({ categories, onDelete }) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const renderItem = (cat, level = 0) => {
    const hasChildren = Array.isArray(cat.children) && cat.children.length > 0;
    const isSpecial = specialCategoryNames.includes(cat.name.toUpperCase());

    return (
      <Box
        key={cat._id}
        pl={level * 3}
        py={2}
        borderLeft={level > 0 ? `2px solid ${borderColor}` : "none"}
        mb={1}
      >
        <Flex
          align="center"
          w="full"
          _hover={{ bg: hoverBg, cursor: "pointer" }}
          borderRadius="md"
          px={2}
        >
          <Text
            fontWeight={level === 0 ? "bold" : "normal"}
            textTransform={level <= 1 ? "uppercase" : "none"}
            fontSize={level >= 2 ? "sm" : "md"}
            color={isSpecial ? "blue.500" : "inherit"}
          >
            {cat.name}
          </Text>
          <Spacer />
          {!isSpecial && (
            <Flex ml="500">
              <IconButton
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                colorScheme="blue"
                aria-label="Edit category"
                mr={1}
                onClick={() => {}} // Tạm thời chưa xử lý
              />
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                aria-label="Delete category"
                onClick={() => onDelete(cat)}
                ml={1}
              />
            </Flex>
          )}
        </Flex>
        {/* Đệ quy hiển thị mọi cấp con */}
        {hasChildren && cat.children.map((child) => renderItem(child, level + 1))}
      </Box>
    );
  };

  return <Box>{categories.map((cat) => renderItem(cat))}</Box>;
};

export default CategoryTree;
