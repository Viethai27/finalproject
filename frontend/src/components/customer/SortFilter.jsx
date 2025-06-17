import { Button, ButtonGroup } from "@chakra-ui/react";

const sortOptions = [
  { label: "Price ↑", value: "price_asc" },
  { label: "Price ↓", value: "price_desc" },
  { label: "Sold ↑", value: "sold_asc" },
  { label: "Sold ↓", value: "sold_desc" },
];

const SortFilter = ({ sortOption, setSortOption }) => {
  return (
    <ButtonGroup spacing={4} mb={6} flexWrap="wrap">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant="outline"
          borderWidth={2}
          borderColor={sortOption === option.value ? "blue.500" : "gray.300"}
          color={sortOption === option.value ? "blue.500" : "gray.600"}
          fontWeight={sortOption === option.value ? "bold" : "normal"}
          _hover={{
            borderColor: "blue.400",
            transform: "scale(1.02)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
          transition="all 0.2s ease"
          onClick={() => setSortOption(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SortFilter;
