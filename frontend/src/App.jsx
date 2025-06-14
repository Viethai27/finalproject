import { Box, Button } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/admin/Dashboard";
import SelectRole from "./pages/SelectRole";
import Home from "./pages/customer/Home";
import AddProduct from "./pages/admin/AddProduct" ;
import ProductListByCategory from "./pages/customer/ProductListByCategory";
import CategoryManage from "./pages/admin/CategoryManage";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import ProductDetail from "./pages/customer/ProductDetail";
import CollectionManagementt from "./pages/admin/Collection";
import ProductManagementPage from "./pages/admin/ProductManagement";

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
                    <Route path="products/category/:slug" element={<ProductListByCategory />} />
               </Route>
            </Routes>

        </Box>
    )
}

export default App;