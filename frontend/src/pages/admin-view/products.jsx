import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import Imagee from "../../components/admin/image-upload";
import Formm from "../../components/common/form";
import { addProductFormElements } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addnewproduct,
  deleteproduct,
  editproduct,
  fetchallproducts,
} from "../../redux/admin/productslice";
import { useToast } from "../../components/ui/use-toast";
import ProductTile from "../../components/admin/product-tile";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  saleprice: "",
  totalstock: "",
  averagereview: 0,
};
const Product = () => {
  const [opencreateproductsdialog, setopencreateproductsdialog] =
    useState(false);
  const [formdata, setformdata] = useState(initialFormData);
  const [imagefile, setimagefile] = useState(null);
  const [uploadedimageurl, setuploadedimageurl] = useState("");
  const [currenteditedid, setcurrenteditid] = useState(null);
  const { productlist } = useSelector((state) => state.adminproducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [imageLoadingState, setImageLoadingState] = useState(false);
  function onsubmit(event) {
    event.preventDefault();
    currenteditedid !== null
      ? dispatch(editproduct({ id: currenteditedid, formdata })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchallproducts());
              setformdata(initialFormData);
              setopencreateproductsdialog(false);
              setcurrenteditid(null);
            }
          }
        )
      : dispatch(addnewproduct({ ...formdata, image: uploadedimageurl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchallproducts());
              setopencreateproductsdialog(false);
              setimagefile(null);
              setformdata(initialFormData);
              toast({
                title: "Product add successfully",
              });
            }
          }
        );
  }
  function handledelete(getcurrentproductid) {
    dispatch(deleteproduct(getcurrentproductid)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchallproducts());
      }
    });
  }
  function isformvalid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchallproducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setopencreateproductsdialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productlist && productlist.length > 0
          ? productlist.map((productitem) => (
              <ProductTile
                setformdata={setformdata}
                setopencreateproductsdialog={setopencreateproductsdialog}
                setcurrenteditid={setcurrenteditid}
                product={productitem}
                handledelete={handledelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={opencreateproductsdialog}
        onOpenChange={() => {
          setopencreateproductsdialog(false);
          setcurrenteditid(null);
          setformdata(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currenteditedid !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <Imagee
            imagefile={imagefile}
            setimagefile={setimagefile}
            uploadedimageurl={uploadedimageurl}
            setuploadedimageurl={setuploadedimageurl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            iseditmode={currenteditedid !== null}
          />
          <div className="py-6">
            <Formm
              onsubmit={onsubmit}
              formdata={formdata}
              setformdata={setformdata}
              buttontext={currenteditedid !== null ? "Edit" : "Add"}
              formcontrol={addProductFormElements}
              isbtndisabled={!isformvalid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Product;
