import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

const OrderDetails = ({ orderdetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[89vh]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderdetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderdetails?.orderdate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderdetails?.totalamount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderdetails?.paymentmethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderdetails?.paymentstatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderdetails?.orderstatus === "confirmed"
                    ? "bg-green-500"
                    : orderdetails?.orderstatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderdetails?.orderstatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderdetails?.cartitems && orderdetails?.cartitems.length > 0
                ? orderdetails?.cartitems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.username}</span>
              <span>{orderdetails?.addressinfo?.address}</span>
              <span>{orderdetails?.addressinfo?.city}</span>
              <span>{orderdetails?.addressinfo?.pincode}</span>
              <span>{orderdetails?.addressinfo?.phone}</span>
              <span>{orderdetails?.addressinfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetails;
