import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import AllProducts from "./pages/products/allproducts/AllProducts";
import SingleProductPage from "./pages/products/singleproduct/SingleProductPage";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage";
import User from "./pages/user/User";
import Wishlist from "./pages/wishlist/Wishlist";
import ResetPasswordpage from "./pages/password/ResetPasswordpage";
import MainPageAdmin from "./pages/admin/main/MainPageAdmin";
import AdminProducts from "./pages/admin/createproduct/AdminProducts";
import Statistics from "./pages/admin/statistics/Statistics";
import UsersPage from "./pages/admin/userslist/UsersPage";
import ManageOrdersPage from "./pages/admin/manageorders/ManageOrdersPage";
import StockPage from "./pages/admin/stock/StockPage";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import ForbiddenRoute from './contexts/ForbiddenRoute'; 

function App() {
  
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
               <Route path="/" element={<ForbiddenRoute element={Main} />} />
              <Route path="/products/:category" element={<ForbiddenRoute element={AllProducts} />} />
              <Route path="/products/:category/:productName" element={<ForbiddenRoute element={SingleProductPage} />} />
              <Route path="/validation-commande" element={<ForbiddenRoute element={CheckoutPage} />} />
              <Route path="/user" element={<ForbiddenRoute element={User} />} />
              <Route path="/user/wishlist" element={<ForbiddenRoute element={Wishlist} />} />
              <Route path="/reset_password/:userId/:recoveryToken" element={<ForbiddenRoute element={ResetPasswordpage} />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute element={MainPageAdmin} roles={['isOwner', 'isWorker']} />} />
              <Route path="/admin/addproduct" element={<ProtectedRoute element={AdminProducts} roles={['isOwner', 'isWorker']} />} />
              <Route path="/admin/statistique" element={<ProtectedRoute element={Statistics} roles={['isOwner', 'isWorker']} />} />
              <Route path="/admin/liste-utilisateurs" element={<ProtectedRoute element={UsersPage} roles={['isOwner', 'isWorker']} />} />
              <Route path="/admin/commandes" element={<ProtectedRoute element={ManageOrdersPage} roles={['isOwner', 'isWorker']}/>} />
              <Route path="/admin/gestionstock" element={<ProtectedRoute element={StockPage} roles={['isOwner', 'isWorker']} />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
