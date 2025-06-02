import { Box, Button } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/admin/Dashboard";
import SelectRole from "./pages/SelectRole";
import Home from "./pages/customer/Home";
import AddProduct from "./pages/admin/AddProduct" ;
import ProductListByCategory from "./pages/customer/ProductListByCategory";
import CategoryManage from "./pages/admin/CategoryManage";
import AdminLayout from "./layouts/AdminLayout";

function App() {
    return (
        <Box minH={"100vh"}>
            <Routes>
                <Route path ="/" element={<SelectRole />} />
                
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="categories" element={<CategoryManage />} />
                    <Route path="products" element={<AddProduct />} />
                </Route>

                <Route path="/customer" element={<Home />} /> 
                <Route path="/products/category/:categoryId" element={<ProductListByCategory />} />
            </Routes>

        </Box>
    )
}

export default App;