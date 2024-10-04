import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, fetchcartitem } from "../../redux/shop/cartslice";
import { setproductdetails } from "../../redux/shop/productslice";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { addreview, getreview } from "../../redux/shop/reviewslice";
import Starr from "../common/star-rating";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { unwrapResult } from "@reduxjs/toolkit"; // Import this to unwrap the result

const ProductDetailss = ({ open, setopen, productdetails }) => {
  const { cartitems } = useSelector((state) => state.shopcart);
  const [reviewmsg, setreviewmsg] = useState("");
  const [rating, setrating] = useState(0);
  const { reviews } = useSelector((state) => state.shopreview);
  const { toast } = useToast();
  function handleratingchange(getrating) {
    setrating(getrating);
  }
  function handledialogclose() {
    setopen(false);
    dispatch(setproductdetails());
    setrating(0);
    setreviewmsg("");
  }
  function handleaddreview() {
    dispatch(
      addreview({
        productId: productdetails?._id,
        userId: user?.id,
        username: user?.username,
        reviewmessage: reviewmsg,
        reviewvalue: rating,
      })
    )
      .then(unwrapResult) // Unwrap the result to access the original payload or error
      .then((data) => {
        if (data?.success) {
          setrating(0);
          setreviewmsg("");
          dispatch(getreview(productdetails?._id));
          toast({ title: "Review added successfully", status: "success" });
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.message === "You already reviewed this product!") {
          toast({
            title: "You can only add one review per product",
            status: "error",
          });
        } else {
          toast({
            title: "An error occurred while adding the review",
            variant: "destructive",
          });
        }
      });
  }

  useEffect(() => {
    if (productdetails !== null) dispatch(getreview(productdetails?._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productdetails]);
  const avgreview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewitem) => sum + reviewitem.reviewvalue, 0) /
        reviews.length
      : 0;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
    <Dialog open={open} onOpenChange={handledialogclose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] max-h-[98vh] overflow-y-auto sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productdetails?.image}
            alt=""
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productdetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productdetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productdetails?.saleprice > 0 ? "line-through" : ""
              }`}
            >
              {productdetails?.price}
            </p>
            {productdetails?.saleprice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {productdetails?.saleprice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Starr rating={avgreview} />
            </div>
            <span className="text-muted-foreground">
              ({avgreview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productdetails?.totalstock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleaddtocart(
                    productdetails?._id,
                    productdetails?.totalstock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewitem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewitem?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewitem?.username}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Starr rating={reviewitem?.reviewvalue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewitem.reviewmessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <Starr
                  rating={rating}
                  handleratingchange={handleratingchange}
                />
              </div>
              <Input
                name="reviewmsg"
                value={reviewmsg}
                onChange={(event) => setreviewmsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleaddreview}
                disabled={reviewmsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailss;
