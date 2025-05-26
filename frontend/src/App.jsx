import { Box, Button } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/admin/Dashboard";
import SelectRole from "./pages/SelectRole";
import Home from "./pages/customer/Home";
import AddProductForm from "./components/admin/AddProductForm";
import ProductListByCategory from "./pages/customer/ProductListByCategory";

function App() {
    return (
        <Box minH={"100vh"}>
            <Routes>
                <Route path ="/" element={<SelectRole />} />
                <Route path ="/admin" element={<Dashboard />} />
                <Route path="/admin/products/AddProductForm" element={<AddProductForm />} />
                <Route path="/customer" element={<Home />} /> 
                <Route path="/products/category/:categoryId" element={<ProductListByCategory />} />
            </Routes>
           

        </Box>
    )
}

export default App;