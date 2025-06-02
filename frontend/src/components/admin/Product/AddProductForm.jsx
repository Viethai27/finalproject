import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  VStack,
  useToast,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const specialCategories = ["Featured", "Popular this month", "Newest"];

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    technology: '',
    imageUrls: [''],
    isFeatured: false,
  });

  const toast = useToast();
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('category');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (!categoryIdFromUrl) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${categoryIdFromUrl}`);
        setCategoryName(res.data.name);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Failed to fetch category info',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchCategoryName();
  }, [categoryIdFromUrl, toast]);

  const handleImageChange = (index, value) => {
    const newImages = [...formData.imageUrls];
    newImages[index] = value;
    setFormData({ ...formData, imageUrls: newImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.imageUrls];
    newImages.splice(index, 1);
    setFormData({ ...formData, imageUrls: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast({
        title: 'Name and price are required.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!categoryIdFromUrl) {
      toast({
        title: 'Category ID is missing in the URL.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (specialCategories.includes(categoryName)) {
      toast({
        title: 'Cannot add product to a special category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryIds: [categoryIdFromUrl],
        imageUrls: formData.imageUrls.filter((url) => url.trim() !== ''),
      };

      await axios.post('http://localhost:5000/api/products/full', payload);
      toast({
        title: 'Product created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        name: '',
        description: '',
        price: '',
        technology: '',
        imageUrls: [''],
        isFeatured: false,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error creating product',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="xl" boxShadow="lg">
      <Heading as="h2" size="lg" mb={4}>
        Add New Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Technology</FormLabel>
            <Input
              placeholder="Technology"
              value={formData.technology}
              onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Product Images</FormLabel>
            <VStack spacing={2} align="stretch">
              {formData.imageUrls.map((url, idx) => (
                <Box key={idx} display="flex" gap={2}>
                  <Input
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                  />
                  {formData.imageUrls.length > 1 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Remove image"
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleRemoveImage(idx)}
                    />
                  )}
                </Box>
              ))}
              <Button leftIcon={<AddIcon />} size="sm" onClick={handleAddImage}>
                Add Image
              </Button>
            </VStack>
          </FormControl>

          <FormControl>
            <Checkbox
              isChecked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            >
              Mark as Featured Product
            </Checkbox>
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Create Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProductForm;
