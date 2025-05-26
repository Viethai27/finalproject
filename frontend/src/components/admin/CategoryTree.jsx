import { Box, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const CategoryTree = ({ categories, onDelete }) => {
  const navigate = useNavigate();

  const renderItem = (cat, level = 0) => (
    <Box key={cat._id} pl={level * 6} py={1} w="full" _hover={{ bg: "gray.50" }}>
      <HStack justify="space-between" w="full" _hover={{ bg: "gray.100", cursor: "pointer" }}>
        <Text fontWeight={level === 0 ? "bold" : "normal"}>{cat.name}</Text>
        <HStack>
          {(!cat.children || cat.children.length === 0) && (
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
      {cat.children?.map((child) => renderItem(child, level + 1))}
    </Box>
  );

  return <>{categories.map((cat) => renderItem(cat))}</>;
};

export default CategoryTree;
