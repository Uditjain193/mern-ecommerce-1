import React, { useState } from "react";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { createorder } from "../../redux/shop/orderslice";
import Address from "../../components/shopping/address";
import CartItem from "../../components/shopping/cart-items-content";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
const Checkout = () => {
  const { cartitems } = useSelector((state) => state.shopcart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoporder);
  const [currentselectedaddress, setcurrentselectedaddress] = useState(null);
  const [ispaymentstart, setispaymentstart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const totalamount =
    cartitems && cartitems.items && cartitems.items.length > 0
      ? cartitems.items.reduce(
          (sum, currentitem) =>
            sum +
            (currentitem?.saleprice > 0
              ? currentitem?.saleprice
              : currentitem?.price) *
              currentitem?.quantity,
          0
        )
      : 0;
  function handleinitiatepaypalpayment() {
    if (cartitems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentselectedaddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }
    const orderdata = {
      userId: user?.id,
      cartId: cartitems?._doc._id,
      cartitems: cartitems.items.map((single) => ({
        productId: single?.productId,
        title: single?.title,
        image: single?.image,
        price: single?.saleprice > 0 ? single?.saleprice : single?.price,
        quantity: single?.quantity,
      })),
      addressinfo: {
        addressId: currentselectedaddress?._id,
        address: currentselectedaddress?.address,
        city: currentselectedaddress?.city,
        pincode: currentselectedaddress?.pincode,
        phone: currentselectedaddress?.phone,
        notes: currentselectedaddress?.notes,
      },
      orderstatus: "pending",
      paymentmethod: "paypal",
      paymentstatus: "pending",
      totalamount: totalamount,
      orderdate: new Date(),
      orderupdatedate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createorder(orderdata)).then((data) => {
      if (data?.payload?.success) {
        setispaymentstart(true);
      } else {
        setispaymentstart(false);
      }
    });
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectid={currentselectedaddress}
          setcurrentselectedaddress={setcurrentselectedaddress}
        />
        <div className="flex flex-col gap-4">
          {cartitems && cartitems.items && cartitems.items.length > 0
            ? cartitems.items.map((item) => <CartItem cartitem={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalamount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleinitiatepaypalpayment} className="w-full">
              {ispaymentstart
                ? "Processing Paypal Payment"
                : "Checkout with paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
