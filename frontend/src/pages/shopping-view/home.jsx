import React, { useEffect, useState } from "react";
import bannerone from "../../assets/banner-1.webp";
import bannertwo from "../../assets/banner-2.webp";
import bannerthree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtocart, fetchcartitem } from "../../redux/shop/cartslice";
import {
  fetchallfilteredproduct,
  fetchproductdetails,
} from "../../redux/shop/productslice";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import ProductTilee from "../../components/shopping/product-tile";
import ProductDetailss from "../../components/shopping/product-details";
import { useToast } from "../../components/ui/use-toast";
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
const Home = () => {
  const [currentslide, setcurrentslide] = useState(0);
  const { productlist, productdetails } = useSelector(
    (state) => state.shopproducts
  );
  const [opendetaildialog, setopendetaildialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handlenavigatetolistingpage(getcurrentitem, section) {
    sessionStorage.removeItem("filters");
    const currentfilter = {
      [section]: [getcurrentitem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentfilter));
    navigate("/shop/listing");
  }
  function handleaddtocart(getcurrentproductid) {
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
    if (productdetails !== null) setopendetaildialog(true);
  }, [productdetails]);
  const slide = [bannerone, bannertwo, bannerthree];
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentslide((prevslide) => (prevslide + 1) % slide.length);
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(
      fetchallfilteredproduct({
        filterparams: {},
        sortparams: "price-lowtohigh",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slide.map((slid, index) => (
          <img
            src={slid}
            alt=""
            className={`${
              index === currentslide ? "opacity-100" : "opacity-0"
            } top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 absolute`}
          />
        ))}
        <Button
          variant="outline"
          onClick={() =>
            setcurrentslide(
              (prevslide) => (prevslide - 1 + slide.length) % slide.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          size="icon"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setcurrentslide((prevslide) => (prevslide + 1) % slide.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryitem) => (
              <Card
                onClick={() =>
                  handlenavigatetolistingpage(categoryitem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryitem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryitem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handlenavigatetolistingpage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </section>
      <ProductDetailss
        open={opendetaildialog}
        setopen={setopendetaildialog}
        productdetails={productdetails}
      />
    </div>
  );
};

export default Home;
