
import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Text,
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

  const fetchParentOptions = async () => {
    try {
      const resRoot = await axios.get("http://localhost:5000/api/categories/roots");
      const roots = resRoot.data.data;

      const fullTree = await Promise.all(
        roots.map(async (root) => {
          const resL2 = await axios.get(
            `http://localhost:5000/api/categories/tree-by-parent?parent=${root._id}`
          );
          return { ...root, children: resL2.data.data };
        })
      );

      setParentOptions(fullTree);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategoryTree = async () => {
    try {
      const resRoot = await axios.get("http://localhost:5000/api/categories/roots");
      const roots = resRoot.data.data;

      const tree = await Promise.all(
        roots.map(async (root) => {
          const resL2 = await axios.get(
            `http://localhost:5000/api/categories/tree-by-parent?parent=${root._id}`
          );
          const level2s = resL2.data.data;

          const level2WithChildren = await Promise.all(
            level2s.map(async (level2) => {
              const resL3 = await axios.get(
                `http://localhost:5000/api/categories/tree-by-parent?parent=${level2._id}`
              );
              return { ...level2, children: resL3.data.data };
            })
          );

          return { ...root, children: level2WithChildren };
        })
      );

      setCategoryTree(tree);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParentOptions();
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
      fetchParentOptions();
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
      fetchParentOptions();
      fetchCategoryTree();
    } catch {
      toast({ title: "Failed to delete category", status: "error" });
    }
  };

  return (
    <>
      <Box mt={4} mr={6} display="flex" justifyContent="flex-end">
        <Button onClick={openForm} bg="rgb(58, 44, 217)" color="white" _hover={{ bg: "rgb(138, 129, 234)" }}>
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
