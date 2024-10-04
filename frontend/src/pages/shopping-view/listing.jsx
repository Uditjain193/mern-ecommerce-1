import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Filterr from "../../components/shopping/filter";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallfilteredproduct,
  fetchproductdetails,
} from "../../redux/shop/productslice";
import ProductTilee from "../../components/shopping/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailss from "../../components/shopping/product-details";
import { addtocart, fetchcartitem } from "../../redux/shop/cartslice";
import { useToast } from "../../components/ui/use-toast";

const Listing = () => {
  const dispatch = useDispatch();
  const { productlist, productdetails } = useSelector(
    (state) => state.shopproducts
  );
  const [filters, setfilters] = useState({});
  const { cartitems } = useSelector((state) => state.shopcart);
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const [sort, setsort] = useState(null);
  const [opendetaildialog, setopendetaildialog] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchparams, setsearchparams] = useSearchParams();
  function handlesort(value) {
    setsort(value);
  }
  const categorysearchparams = searchparams.get("category");
  function handlefilter(getsectionid, getcurrentoption) {
    let cpyfilters = { ...filters };
    const indexofcurrentsection = Object.keys(cpyfilters).indexOf(getsectionid);
    if (indexofcurrentsection === -1) {
      cpyfilters = {
        ...cpyfilters,
        [getsectionid]: [getcurrentoption],
      };
    } else {
      const indexofcurrentsection =
        cpyfilters[getsectionid].indexOf(getcurrentoption);
      if (indexofcurrentsection === -1)
        cpyfilters[getsectionid].push(getcurrentoption);
      else cpyfilters[getsectionid].splice(indexofcurrentsection, 1);
    }
    setfilters(cpyfilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyfilters));
  }
  function createsearchparamss(filterparams) {
    const queryparams = [];
    for (const [key, value] of Object.entries(filterparams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramsvalue = value.join(",");
        queryparams.push(`${key}=${encodeURIComponent(paramsvalue)}`);
      }
    }
    return queryparams.join("&");
  }
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createquerystring = createsearchparamss(filters);
      setsearchparams(new URLSearchParams(createquerystring));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  useEffect(() => {
    if (productdetails !== null) setopendetaildialog(true);
  }, [productdetails]);
  useEffect(() => {
    setsort("price-lowtohigh");
    setfilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorysearchparams]);
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchallfilteredproduct({ filterparams: filters, sortparams: sort })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);
  function handlegetproductdetails(getcurrentid) {
    dispatch(fetchproductdetails(getcurrentid));
  }
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <Filterr filters={filters} handlefilter={handlefilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productlist?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
                  {sortOptions.map((sortitem) => (
                    <DropdownMenuRadioItem
                      value={sortitem.id}
                      key={sortitem.id}
                    >
                      {sortitem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productlist && productlist.length > 0
            ? productlist.map((productitem) => (
                <ProductTilee
                  handlegetproductdetails={handlegetproductdetails}
                  product={productitem}
                  handleaddtocart={handleaddtocart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailss
        open={opendetaildialog}
        setopen={setopendetaildialog}
        productdetails={productdetails}
      />
    </div>
  );
};

export default Listing;