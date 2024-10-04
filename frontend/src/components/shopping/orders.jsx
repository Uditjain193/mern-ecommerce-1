import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./order-details";
import {
  getallordersbyuserid,
  getorderdetails,
  resetorderdetailss,
} from "../../redux/shop/orderslice";
import { Badge } from "../ui/badge";

const Orderss = () => {
  const [opendetailsdialog, setopendetailsdialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderlist, orderdetails } = useSelector((state) => state.shoporder);
  function handlefetchorderdetails(getid) {
    dispatch(getorderdetails(getid));
  }
  useEffect(() => {
    dispatch(getallordersbyuserid(user?.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (orderdetails !== null) setopendetailsdialog(true);
  }, [orderdetails]);
  console.log(orderlist);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderlist && orderlist.length > 0
                ? orderlist.map((orderitem) => (
                    <TableRow>
                      <TableCell>{orderitem?._id}</TableCell>
                      <TableCell>
                        {orderitem?.orderdate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderitem?.orderstatus === "confirmed"
                              ? "bg-green-500"
                              : orderitem?.orderstatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {orderitem?.orderstatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${orderitem?.totalamount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handlefetchorderdetails(orderitem?._id)
                          }
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={opendetailsdialog}
        onOpenChange={() => {
          setopendetailsdialog(false);
          dispatch(resetorderdetailss());
        }}
      >
        <OrderDetails orderdetails={orderdetails} />
      </Dialog>
    </div>
  );
};

export default Orderss;
