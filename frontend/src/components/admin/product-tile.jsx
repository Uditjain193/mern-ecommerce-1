import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ProductTile = ({
  product,
  setformdata,
  setopencreateproductsdialog,
  setcurrenteditid,
  handledelete,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.saleprice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.saleprice > 0 ? (
              <span className="text-lg font-bold">${product?.saleprice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setopencreateproductsdialog(true);
              setcurrenteditid(product?._id);
              setformdata(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handledelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
