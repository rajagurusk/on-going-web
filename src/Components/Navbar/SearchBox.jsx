import { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function SearchBox({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log("Received products:", products);

  // Function to handle search
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const results = products.filter((product) =>
      product.toLowerCase().includes(value)
    );

    setFilteredProducts(results.length > 0 ? results : ["Product not found"]);
  };

  return (
    <div>
      {/* Search Input */}
      <InputGroup
        height={"40px"}
        backgroundColor={"#EEF6F3"}
        borderRadius={"20px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingRight={"0px"}
        width={"300px"}
        margin={"auto"}
      >
        <Input
          outline={"none"}
          width={"90%"}
          border={"none"}
          variant={"filled"}
          color={"#5EA98B"}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch className="hover:bg-[#5EA98B] hover:text-white w-12 rounded-full h-12 p-4 text-[#5EA98B]" />
        <InputRightElement pointerEvents="none" />
      </InputGroup>
      {/* Display Search Results */}
      <div style={{ marginTop: "10px", color: "#5EA98B" }}>
        {searchTerm && (
          <ul>
            {filteredProducts.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
