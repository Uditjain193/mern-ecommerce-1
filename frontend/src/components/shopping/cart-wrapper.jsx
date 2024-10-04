import React from "react";
import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItem from "./cart-items-content";
import { Button } from "../ui/button";

const CartWrapper = ({ cartitems, setopencartsheet }) => {
  const navigate = useNavigate();
  const totalcartamount =
    cartitems && cartitems.length > 0
      ? cartitems.reduce(
          (sum, currentitem) =>
            sum +
            (currentitem?.saleprice > 0
              ? currentitem?.saleprice
              : currentitem?.price) *
              currentitem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartitems && cartitems.length > 0
          ? cartitems.map((item) => <CartItem cartitem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">{totalcartamount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setopencartsheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
