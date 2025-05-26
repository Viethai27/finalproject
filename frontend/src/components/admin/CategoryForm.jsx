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
  Button
} from "@chakra-ui/react";
import React from "react";

const CategoryForm = ({ isOpen, onClose, name, setName, parent, setParent, parentOptions, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Parent (optional)</FormLabel>
            <Select placeholder="Select parent category" value={parent} onChange={(e) => setParent(e.target.value)}>
              {parentOptions.map((cat) => (
                <React.Fragment key={cat._id}>
                  <option value={cat._id}>{cat.name}</option>
                  {cat.children?.map((child) => (
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
          <Button onClick={onSubmit} colorScheme="blue" mr={3}>Create</Button>
          <Button onClick={onClose} variant="ghost">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryForm;
