import { Box, Button } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';

import SelectRole from "./pages/SelectRole";


import CustomerLayout from "./layouts/CustomerLayout";
import Home from "./pages/customer/Home";
import ProductDetail from "./pages/customer/ProductDetail";
import CategoryPage from "./pages/customer/CategoryPage";


import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct" ;
import CollectionManagementt from "./pages/admin/Collection";
import ProductManagementPage from "./pages/admin/ProductManagement";
import CategoryManage from "./pages/admin/CategoryManage";

function App() {
    return (
        <Box minH={"100vh"}>
            <Routes>
                <Route path ="/" element={<SelectRole />} />
                
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="categories" element={<CategoryManage />} />
                    <Route path="addproducts" element={<AddProduct />} />
                    <Route path="collections" element={<CollectionManagementt />} />
                    <Route path="productmanagement" element={<ProductManagementPage />} />
                </Route>

               <Route path="/customer" element={<CustomerLayout />}>
                    <Route path="home" element={<Home/>} />
                    <Route path="product-detail" element={<ProductDetail/>} />
                    <Route path="products/category/:id" element={<CategoryPage />} />
               </Route>
            </Routes>

        </Box>
    )
}

export default App;