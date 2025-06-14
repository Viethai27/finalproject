import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  Image,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const AddCollection = ({ isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    images: [""],
    productIds: [],
  });

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productRes, imageRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/product-images"),
        ]);

        const products = productRes.data?.data || [];
        const images = imageRes.data?.data || [];

        const enrichedProducts = products.map((prod) => {
          const foundImage = images.find((img) => img.productId === prod._id);
          return { ...prod, image: foundImage?.url || "" };
        });

        setAllProducts(enrichedProducts);
      } catch (err) {
        console.error("Failed to fetch products or images", err);
      }
    };

    if (isOpen) fetchProducts();
  }, [isOpen]);

  const handleChangeImage = (index, value) => {
    const newImages = [...collection.images];
    newImages[index] = value;
    setCollection({ ...collection, images: newImages });
  };

  const handleAddImageField = () => {
    setCollection({ ...collection, images: [...collection.images, ""] });
  };

  const handleRemoveImageField = (index) => {
    const newImages = collection.images.filter((_, i) => i !== index);
    setCollection({ ...collection, images: newImages });
  };

  const handleToggleProduct = (productId) => {
    const current = collection.productIds.includes(productId);
    const newProductIds = current
      ? collection.productIds.filter((id) => id !== productId)
      : [...collection.productIds, productId];
    setCollection({ ...collection, productIds: newProductIds });
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/collections", collection);
      toast({ title: "Collection added.", status: "success", duration: 2000 });
      onSuccess();
      onClose();
      setCollection({ name: "", description: "", images: [""], productIds: [] });
    } catch (err) {
      toast({ title: "Failed to save collection.", status: "error", duration: 2000 });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              value={collection.name}
              onChange={(e) => setCollection({ ...collection, name: e.target.value })}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={collection.description}
              onChange={(e) => setCollection({ ...collection, description: e.target.value })}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Image URLs</FormLabel>
            {collection.images.map((img, index) => (
              <Flex key={index} mb={2} gap={2}>
                <Input
                  value={img}
                  placeholder={`Image URL ${index + 1}`}
                  onChange={(e) => handleChangeImage(index, e.target.value)}
                />
                {collection.images.length > 1 && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleRemoveImageField(index)}
                  >
                    X
                  </Button>
                )}
              </Flex>
            ))}
            <Button size="sm" mt={2} onClick={handleAddImageField}>+ Add Image</Button>
          </FormControl>

          <Button mt={4} colorScheme="blue" onClick={handleSave}>Save</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCollection;
