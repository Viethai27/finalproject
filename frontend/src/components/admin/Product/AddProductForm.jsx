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
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'react-datepicker/dist/react-datepicker.css';

const AddProductForm = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    technology: '',
    imageUrls: [''],
    isFeatured: false,
    featuredStart: null,
    featuredEnd: null,
    categoryIds: [],
  });

  const [leafCategories, setLeafCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories/tree');
        const raw = res.data.data;

        const isSpecial = (name) =>
          ['Featured', 'Popular this month', 'Newest'].includes(name);

        const leafs = [];

        const traverse = (nodes, parentPath = []) => {
          nodes.forEach((node) => {
            if (isSpecial(node.name)) return;

            const currentPath = [...parentPath, node.name];

            if (!node.children || node.children.length === 0) {
              leafs.push({
                value: node._id,
                label: currentPath.join(' > '),
              });
            } else {
              traverse(node.children, currentPath);
            }
          });
        };

        traverse(raw);
        setLeafCategories(leafs);
      } catch (err) {
        toast({
          title: 'Failed to load categories',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, [toast]);

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

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString(); // chuẩn ISO cho backend
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

    if (formData.categoryIds.length === 0) {
      toast({
        title: 'Please select at least one category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.isFeatured && (!formData.featuredStart || !formData.featuredEnd)) {
      toast({
        title: 'Please provide start and end dates for featured products.',
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
        imageUrls: formData.imageUrls.filter((url) => url.trim() !== ''),
        featuredStart: formatDate(formData.featuredStart),
        featuredEnd: formatDate(formData.featuredEnd),
      };

      console.log('Payload gửi về:', payload); // DEBUG

      await axios.post('http://localhost:5000/api/products/create-full', payload);

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
        featuredStart: null,
        featuredEnd: null,
        categoryIds: [],
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
    <Box maxW="700px" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="xl" boxShadow="lg">
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
              type="number"
              placeholder="Price"
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

          <FormControl isRequired>
            <FormLabel>Select Categories (leaf only)</FormLabel>
            <Select
              components={makeAnimated()}
              isMulti
              placeholder="Choose categories..."
              options={leafCategories}
              value={leafCategories.filter((cat) => formData.categoryIds.includes(cat.value))}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  categoryIds: selectedOptions.map((opt) => opt.value),
                })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
            >
              Mark as Featured Product
            </Checkbox>
          </FormControl>

          {formData.isFeatured && (
            <>
              <FormControl isRequired>
                <FormLabel>Featured Start Date</FormLabel>
                <Box>
                  <DatePicker
                    selected={formData.featuredStart}
                    onChange={(date) =>
                      setFormData({ ...formData, featuredStart: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    customInput={<Input />}
                  />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Featured End Date</FormLabel>
                <Box>
                  <DatePicker
                    selected={formData.featuredEnd}
                    onChange={(date) =>
                      setFormData({ ...formData, featuredEnd: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    customInput={<Input />}
                  />
                </Box>
              </FormControl>
            </>
          )}

          <Button colorScheme="teal" type="submit">
            Create Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProductForm;
