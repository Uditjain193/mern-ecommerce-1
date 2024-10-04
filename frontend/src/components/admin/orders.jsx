import {
  getallordersforadmin,
  getorderdetailsforadmin,
  resetorderdetails,
} from "../../redux/admin/orderslice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Dialog } from "../ui/dialog";
import OrderDetails from "./order-details";
import { Button } from "../ui/button";

const Orderss = () => {
  const [opendetailsdialog, setopendetailsdialog] = useState(false);
  const { orderlist, orderdetails } = useSelector((state) => state.adminorder);
  const dispatch = useDispatch();
  function handlefetchorderdetails(getid) {
    dispatch(getorderdetailsforadmin(getid));
  }
  useEffect(() => {
    dispatch(getallordersforadmin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (orderdetails !== null) setopendetailsdialog(true);
  }, [orderdetails]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
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
                      <TableCell>{orderitem?.totalamount}</TableCell>
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
          dispatch(resetorderdetails());
        }}
      >
        <OrderDetails orderDetails={orderdetails} />
      </Dialog>
    </div>
  );
};

export default Orderss;
