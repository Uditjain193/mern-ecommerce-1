import {
  getsearchresults,
  resetsearchresults,
} from "../../redux/shop/searchslice";
import { useToast } from "../../components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addtocart, fetchcartitem } from "../../redux/shop/cartslice";
import { fetchproductdetails } from "../../redux/shop/productslice";
import { Input } from "../../components/ui/input";
import ProductTilee from "../../components/shopping/product-tile";
import ProductDetailss from "../../components/shopping/product-details";

const Searchproduct = () => {
  const [keyword, setkeyword] = useState("");
  const [opendetailsdialog, setopendetailsdialog] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchparams, setsearchparams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchresults } = useSelector((state) => state.shopsearch);
  const { productdetails } = useSelector((state) => state.shopproducts);
  const { user } = useSelector((state) => state.auth);
  const { cartitems } = useSelector((state) => state.shopcart);
  const { toast } = useToast();
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setsearchparams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getsearchresults(keyword));
      }, 1000);
    } else {
      setsearchparams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetsearchresults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  function handleaddtocart(getcurrentproductid, gettotalstock) {
    let getcartitems = cartitems.items || [];
    if (getcartitems.length) {
      const indexofcurrentitem = getcartitems.findIndex(
        (item) => item.productId === getcurrentproductid
      );
      if (indexofcurrentitem > -1) {
        const getquantity = getcartitems[indexofcurrentitem].quantity;
        if (getquantity + 1 > gettotalstock) {
          toast({
            title: `Only ${getquantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addtocart({
        userId: user?.id,
        productId: getcurrentproductid,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchcartitem(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }
  function handlegetproductdetails(getcurrentproductid) {
    dispatch(fetchproductdetails(getcurrentproductid));
  }
  useEffect(() => {
    if (productdetails !== null) setopendetailsdialog(true);
  }, [productdetails]);
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setkeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchresults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchresults.map((item) => (
          <ProductTilee
            handleaddtocart={handleaddtocart}
            product={item}
            handlegetproductdetails={handlegetproductdetails}
          />
        ))}
      </div>
      <ProductDetailss
        open={opendetailsdialog}
        setopen={setopendetailsdialog}
        productdetails={productdetails}
      />
    </div>
  );
};

export default Searchproduct;
