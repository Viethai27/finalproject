import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";

const CategoryForm = ({
  isOpen,
  onClose,
  name,
  setName,
  parent,
  setParent,
  parentOptions,
  onSubmit
}) => {
  const specialSections = ["Featured", "Popular this month", "Newest"];
  const [error, setError] = useState("");

  const handleCreate = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    if (specialSections.some(s => s.toLowerCase() === trimmedName.toLowerCase())) {
      setError(`Category name "${trimmedName}" is reserved as a special category.`);
      return;
    }

    let siblingCategories = [];

    const findParentCategory = (cats, parentId) => {
      for (const cat of cats) {
        if (cat._id === parentId) return cat;
        if (cat.children) {
          const found = findParentCategory(cat.children, parentId);
          if (found) return found;
        }
      }
      return null;
    };

    if (parent) {
      const parentCat = findParentCategory(parentOptions, parent);
      siblingCategories = parentCat?.children || [];
    } else {
      siblingCategories = parentOptions.filter(cat => !cat.parent);
    }

    // Kiểm tra trùng tên trong các category cùng parent
    if (
      siblingCategories.some(
        (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError(`Category name "${trimmedName}" already exists under the selected parent.`);
      return;
    }

    setError("");
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3} isInvalid={!!error}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {error}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Parent (optional)</FormLabel>
            <Select
              placeholder="Select parent category"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              {parentOptions
                .filter((cat) => !specialSections.includes(cat.name))
                .map((cat) => (
                  <React.Fragment key={cat._id}>
                    <option value={cat._id}>{cat.name}</option>
                    {cat.children
                      ?.filter((child) => !specialSections.includes(child.name))
                      .map((child) => (
                        <option key={child._id} value={child._id}>
                          {cat.name} / {child.name}
                        </option>
                      ))}
                  </React.Fragment>
                ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCreate} colorScheme="blue" mr={3}>
            Create
          </Button>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryForm;
