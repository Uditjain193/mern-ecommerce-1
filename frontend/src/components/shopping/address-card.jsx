import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressinfo,
  handledeleteaddress,
  handleeditaddress,
  setcurrentselectedaddress,
  selectedid,
}) => {
  return (
    <Card
      className={`cursor-pointer border-red-700 ${
        selectedid?._id === addressinfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
      onClick={
        setcurrentselectedaddress
          ? () => setcurrentselectedaddress(addressinfo)
          : null
      }
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressinfo?.address}</Label>
        <Label>City: {addressinfo?.city}</Label>
        <Label>pincode: {addressinfo?.pincode}</Label>
        <Label>Phone: {addressinfo?.phone}</Label>
        <Label>Notes: {addressinfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleeditaddress(addressinfo)}>Edit</Button>
        <Button onClick={() => handledeleteaddress(addressinfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
