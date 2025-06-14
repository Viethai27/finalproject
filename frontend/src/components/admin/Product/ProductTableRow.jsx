import { Tr, Td, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ProductTableRow = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Tr>
      <Td>{product.name}</Td>
      <Td>${product.price.toFixed(2)}</Td>
      <Td>{product.category?.name || "—"}</Td>
      <Td>{product.totalSold}</Td>
      <Td>{new Date(product.createdAt).toLocaleDateString()}</Td>
      <Td textAlign="center">
        <IconButton
          icon={<EditIcon />}
          size="sm"
          mr={2}
          aria-label="Edit"
          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
        />
        <IconButton
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          aria-label="Delete"
          onClick={() => onDelete(product._id)}
        />
      </Td>
    </Tr>
  );
};

export default ProductTableRow;
