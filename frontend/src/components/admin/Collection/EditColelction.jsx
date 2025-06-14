import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";

const EditCollection = ({ isOpen, onClose, editingCollection, setEditingCollection, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              value={editingCollection.name}
              onChange={(e) => setEditingCollection({ ...editingCollection, name: e.target.value })}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={editingCollection.description}
              onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Image URLs</FormLabel>
            {editingCollection.images.map((img, index) => (
              <Flex key={index} mb={2} gap={2}>
                <Input
                  value={img}
                  placeholder={`Image URL ${index + 1}`}
                  onChange={(e) => {
                    const newImages = [...editingCollection.images];
                    newImages[index] = e.target.value;
                    setEditingCollection({ ...editingCollection, images: newImages });
                  }}
                />
                {editingCollection.images.length > 1 && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      const newImages = editingCollection.images.filter((_, i) => i !== index);
                      setEditingCollection({ ...editingCollection, images: newImages });
                    }}
                  >
                    X
                  </Button>
                )}
              </Flex>
            ))}
            <Button
              size="sm"
              mt={2}
              onClick={() => {
                setEditingCollection({ ...editingCollection, images: [...editingCollection.images, ""] });
              }}
            >
              + Add Image
            </Button>
          </FormControl>

          <Button colorScheme="blue" onClick={onSave}>Save</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCollection;