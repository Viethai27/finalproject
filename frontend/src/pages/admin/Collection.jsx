import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Text,
  Spinner,
  useToast,
  Image,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

import AddCollection from "../../components/admin/Collection/AddCollection";
import EditCollection from "../../components/admin/Collection/EditColelction";

const CollectionManagement = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCollection, setNewCollection] = useState({ name: "", description: "", images: [""] });
  const [editingCollection, setEditingCollection] = useState(null);

  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/collections");
      setCollections(res.data?.data || []);
    } catch (err) {
      toast({
        title: "Error loading collections.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/collections/${id}`);
      toast({
        title: "Collection deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast({
        title: "Failed to delete collection.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filtered = collections.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCollections(filtered);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
    setNewCollection({ name: "", description: "", images: [""] });
  };

  const handleSave = async () => {
    try {
      if (editingCollection) {
        await axios.put(
          `http://localhost:5000/api/collections/${editingCollection._id}`,
          editingCollection
        );
        toast({ title: "Collection updated.", status: "success", duration: 2000 });
      } else {
        await axios.post("http://localhost:5000/api/collections", newCollection);
        toast({ title: "Collection added.", status: "success", duration: 2000 });
      }
      fetchCollections();
      handleModalClose();
    } catch (err) {
      toast({ title: "Failed to save collection.", status: "error", duration: 2000 });
    }
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Collection Management</Text>
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}>
          Add Collection
        </Button>
      </Flex>

      <InputGroup mb={4}>
        <Input
          placeholder="Search collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <InputRightElement>
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>

      {loading ? (
        <Flex justify="center" mt={8}><Spinner size="lg" /></Flex>
      ) : (
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Images</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {collections.length > 0 ? (
              collections.map((collection) => (
                <Tr key={collection._id}>
                  <Td>{collection.name}</Td>
                  <Td>{collection.description}</Td>
                  <Td>
                    <Flex gap={2} wrap="wrap">
                      {collection.images?.slice(0, 3).map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt="collection"
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      ))}
                      {collection.images?.length > 3 && (
                        <Text fontSize="sm">+{collection.images.length - 3} more</Text>
                      )}
                    </Flex>
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="yellow"
                      variant="outline"
                      size="sm"
                      mr={2}
                      onClick={() => {
                        setEditingCollection(collection);
                        setIsModalOpen(true);
                      }}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(collection._id)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr><Td colSpan={4} textAlign="center">No collections found.</Td></Tr>
            )}
          </Tbody>
        </Table>
      )}

      {/* Modal */}
      {!editingCollection ? (
        <AddCollection
          isOpen={isModalOpen}
          onClose={handleModalClose}
          newCollection={newCollection}
          setNewCollection={setNewCollection}
          onSave={handleSave}
        />
      ) : (
        <EditCollection
          isOpen={isModalOpen}
          onClose={handleModalClose}
          editingCollection={editingCollection}
          setEditingCollection={setEditingCollection}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default CollectionManagement;
