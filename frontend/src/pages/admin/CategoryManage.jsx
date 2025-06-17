import { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CategoryForm from "../../components/admin/Category/CategoryForm";
import CategoryTree from "../../components/admin/Category/CategoryTree";
import DeleteConfirmDialog from "../../components/admin/Category/DeleteConfirmDialog";

const CategoryManage = () => {
  const {
    isOpen: isFormOpen,
    onOpen: openForm,
    onClose: closeForm,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();

  const toast = useToast();

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [parentOptions, setParentOptions] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategoryTree = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories/tree");
      setCategoryTree(res.data.data);
      setParentOptions(res.data.data); // dùng luôn để chọn parent
    } catch (err) {
      console.error("Failed to fetch category tree", err);
    }
  };

  useEffect(() => {
    fetchCategoryTree();
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      toast({ title: "Name is required", status: "warning" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/categories", {
        name,
        parent: parent || null,
      });
      toast({ title: "Category created", status: "success" });
      closeForm();
      setName("");
      setParent("");
      fetchCategoryTree();
    } catch {
      toast({ title: "Failed to create category", status: "error" });
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryToDelete._id}`);
      toast({ title: `Deleted "${categoryToDelete.name}"`, status: "info" });
      setCategoryToDelete(null);
      fetchCategoryTree();
    } catch {
      toast({ title: "Failed to delete category", status: "error" });
    }
  };

  return (
    <>
      <Box mt={4} mr={6} display="flex" justifyContent="flex-end">
        <Button
          onClick={openForm}
          bg="rgb(58, 44, 217)"
          color="white"
          _hover={{ bg: "rgb(138, 129, 234)" }}
        >
          Add New Category
        </Button>
      </Box>

      <Box mt={6} px={6} color="rgb(60, 50, 170)" fontWeight="bold">
        <VStack align="start" spacing={1} w="full">
          <CategoryTree
            categories={categoryTree}
            onDelete={(cat) => {
              setCategoryToDelete(cat);
              openDeleteDialog();
            }}
          />
        </VStack>
      </Box>

      <CategoryForm
        isOpen={isFormOpen}
        onClose={closeForm}
        name={name}
        setName={setName}
        parent={parent}
        setParent={setParent}
        parentOptions={parentOptions}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => {
          handleDelete();
          closeDeleteDialog();
        }}
        category={categoryToDelete}
      />
    </>
  );
};

export default CategoryManage;
