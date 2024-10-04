import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import {
  addaddress,
  deleteaddress,
  editaddress,
  fetchaddress,
} from "../../redux/shop/addressslice";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card";
import Formm from "../common/form";
import { addressFormControls } from "../../config";

const initialstate = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address = ({ setcurrentselectedaddress, selectid }) => {
  const [formdata, setformdata] = useState(initialstate);
  const [currenteditid, setcurrenteditid] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresslist } = useSelector((state) => state.shopaddress);
  const { toast } = useToast();
  function handlemanageaddress(event) {
    event.preventDefault();
    if (addresslist.length >= 3 && currenteditid === null) {
      setformdata(initialstate);
      toast({
        title: "You can add max 3 address",
        variant: "destructive",
      });
      return;
    }
    currenteditid !== null
      ? dispatch(
          editaddress({ userId: user?.id, addressId: currenteditid, formdata })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchaddress(user?.id));
            setcurrenteditid(null);
            setformdata(initialstate);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(addaddress({ ...formdata, userId: user?.id })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchaddress(user?.id));
            setformdata(initialstate);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }
  function handledeleteaddress(getcurrentaddress) {
    dispatch(
      deleteaddress({ userId: user?.id, addressId: getcurrentaddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchaddress(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }
  function handleeditaddress(getcurrentaddress) {
    setcurrenteditid(getcurrentaddress?._id);
    setformdata({
      ...formdata,
      address: getcurrentaddress?.address,
      city: getcurrentaddress?.city,
      phone: getcurrentaddress?.phone,
      pincode: getcurrentaddress?.pincode,
      notes: getcurrentaddress?.notes,
    });
  }
  function isformvalid() {
    return Object.keys(formdata)
      .map((key) => formdata[key].trim() !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchaddress(user?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addresslist && addresslist.length > 0
          ? addresslist.map((singleitem) => (
              <AddressCard
                selectedid={selectid}
                setcurrentselectedaddress={setcurrentselectedaddress}
                handledeleteaddress={handledeleteaddress}
                addressinfo={singleitem}
                handleeditaddress={handleeditaddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currenteditid !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Formm
          formcontrol={addressFormControls}
          formdata={formdata}
          setformdata={setformdata}
          buttontext={currenteditid !== null ? "Edit" : "Add"}
          onsubmit={handlemanageaddress}
          isbtndisabled={!isformvalid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
