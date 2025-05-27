import { Box, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const CategoryTree = ({ categories, onDelete }) => {
  const navigate = useNavigate();

  const specialCategoryNames = ['FEATURED', 'POPULAR THIS MONTH', 'NEWEST'];

  const renderItem = (cat, level = 0) => {
    const hasChildren = Array.isArray(cat.children) && cat.children.length > 0;

    // Kiểm tra xem category này có phải category đặc biệt không
    const isSpecial = specialCategoryNames.includes(cat.name.toUpperCase());

    return (
      <Box key={cat._id} pl={level * 6} py={1} w="full">
        <HStack justify="space-between" w="full">
          <Text
            fontWeight={level === 0 ? "bold" : "normal"}
            textTransform={level <= 1 ? "uppercase" : "none"} // Mức 0 và 1 in hoa
          >
            {cat.name}
          </Text>

          <HStack spacing={2}>
            {/* Ẩn nút Add Product nếu là category đặc biệt hoặc có con */}
            {!hasChildren && !isSpecial && (
              <Button
                size="xs"
                colorScheme="teal"
                onClick={() =>
                  navigate(`/admin/products/AddProductForm?category=${cat._id}`)
                }
              >
                Add Product
              </Button>
            )}
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Delete category"
              onClick={() => onDelete(cat)}
            />
          </HStack>
        </HStack>

        {hasChildren &&
          cat.children.map((child) => renderItem(child, level + 1))}
      </Box>
    );
  };

  return <>{categories.map((cat) => renderItem(cat))}</>;
};

export default CategoryTree;
