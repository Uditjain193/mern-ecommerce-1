import {
  getallordersforadmin,
  getorderdetailsforadmin,
  updateorderstatus,
} from "../../redux/admin/orderslice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Formm from "../common/form";
import { useToast } from "../ui/use-toast";
const OrderDetails = ({ orderDetails }) => {
  const initialformdata = {
    status: "",
  };
  const [formdata, setformdata] = useState(initialformdata);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  function handleupdatestatus(event) {
    event.preventDefault();
    const { status } = formdata;
    dispatch(
      updateorderstatus({ id: orderDetails?._id, orderstatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getorderdetailsforadmin(orderDetails?._id));
        dispatch(getallordersforadmin());
        setformdata(initialformdata);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }
  return (
    <DialogContent className="overflow-y-auto max-h-[89vh] sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderdate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalamount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentmethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentstatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderstatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderstatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderstatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartitems && orderDetails?.cartitems.length > 0
                ? orderDetails?.cartitems.map((item) => (
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
              <span>{orderDetails?.addressinfo?.address}</span>
              <span>{orderDetails?.addressinfo?.city}</span>
              <span>{orderDetails?.addressinfo?.pincode}</span>
              <span>{orderDetails?.addressinfo?.phone}</span>
              <span>{orderDetails?.addressinfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <Formm
            formcontrol={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                  { id: "confirmed", label: "Confirmed" },
                ],
              },
            ]}
            formdata={formdata}
            setformdata={setformdata}
            buttontext={"Update Order Status"}
            onsubmit={handleupdatestatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetails;
