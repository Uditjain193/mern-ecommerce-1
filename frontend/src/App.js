import { Route, Routes } from "react-router-dom";
import Layout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import Product from "./pages/admin-view/products";
import Orders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping/layout";
import Home from "./pages/shopping-view/home";
import Listing from "./pages/shopping-view/listing";
import Checkout from "./pages/shopping-view/checkout";
import Account from "./pages/shopping-view/account";
import Paypal from "./pages/shopping-view/paypal-return";
import Payment from "./pages/shopping-view/payment-success";
import Searchproduct from "./pages/shopping-view/search";
import Unauth from "./pages/unauth-page";
import Index from "./pages/not-found";
import Checkk from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkauth } from "./redux/auth";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { user, isauth, isloading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token=JSON.parse(sessionStorage.getItem("token"))
    dispatch(checkauth(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isloading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Checkk isauth={isauth} user={user}></Checkk>}/>
        <Route path="/auth" element={<Checkk>
          <Layout />
        </Checkk>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<Checkk isauth={isauth} user={user}><AdminLayout /></Checkk>}>
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/shop" element={<Checkk isauth={isauth} user={user}><ShoppingLayout /></Checkk>}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<Paypal />} />
          <Route path="payment-success" element={<Payment />} />
          <Route path="search" element={<Searchproduct />} />
        </Route>
        <Route path="/unauth" element={<Unauth />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
