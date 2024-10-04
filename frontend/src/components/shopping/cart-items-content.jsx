import { deletecartitem, updatecartquantity } from "../../redux/shop/cartslice";
import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const CartItem = ({ cartitem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartitems } = useSelector((state) => state.shopcart);
  const { productlist } = useSelector((state) => state.shopproducts);
  const { toast } = useToast();
  const dispatch = useDispatch();
  function handleupdatequantity(getcartitem, typeofaction) {
    // eslint-disable-next-line eqeqeq
    if (typeofaction == "plus") {
      let getcartitems = cartitems.items || [];
      if (getcartitems.length) {
        const indexofcurrentcartitem = getcartitems.findIndex(
          (item) => item.productId === getcartitem?.productId
        );
        const getcurrentproductindex = productlist.findIndex(
          (product) => product._id === getcartitem?.productId
        );
        const gettotalstock = productlist[getcurrentproductindex].totalstock;
        if (indexofcurrentcartitem > -1) {
          const getquantity = getcartitems[indexofcurrentcartitem].quantity;
          if (getquantity + 1 > gettotalstock) {
            toast({
              title: `Only ${getquantity} quanity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }
    dispatch(
      updatecartquantity({
        userId: user?.id,
        productId: getcartitem?.productId,
        quantity:
          typeofaction === "plus"
            ? getcartitem?.quantity + 1
            : getcartitem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }
  function handledeleteitem(getcartitem) {
    dispatch(
      deletecartitem({ userId: user?.id, productId: getcartitem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }
  return (
    <div>
      <div className="flex items-center space-x-4">
        <img
          src={cartitem?.image}
          alt={cartitem?.title}
          className="w-20 h-20 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartitem?.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              disabled={cartitem?.quantity === 1}
              onClick={() => handleupdatequantity(cartitem, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartitem?.quantity}</span>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              onClick={() => handleupdatequantity(cartitem, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartitem?.saleprice > 0
                ? cartitem?.saleprice
                : cartitem?.price) * cartitem?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handledeleteitem(cartitem)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
