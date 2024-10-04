import { shoppingViewHeaderMenuItems } from "../../config";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Label } from "../ui/label";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {  resettokenandcredentials } from "../../redux/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { fetchcartitem } from "../../redux/shop/cartslice";
import CartWrapper from "./cart-wrapper";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [searchparams, setsearchparams] = useSearchParams();
  function handlenavigate(getcurrentitem) {
    sessionStorage.removeItem("filters");
    const currentfilter =
      getcurrentitem.id !== "home" &&
      getcurrentitem.id !== "products" &&
      getcurrentitem.id !== "search"
        ? {
            category: [getcurrentitem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentfilter));
    location.pathname.includes("listing") && currentfilter !== null
      ? setsearchparams(new URLSearchParams(`?category=${getcurrentitem.id}`))
      : navigate(getcurrentitem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuitem) => (
        <Label
          onClick={() => handlenavigate(menuitem)}
          className="text-sm font-medium cursor-pointer"
        >
          {menuitem.label}
        </Label>
      ))}
    </nav>
  );
}
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartitems } = useSelector((state) => state.shopcart);
  const [opencartsheet, setopencartsheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    //dispatch(logout());
    dispatch(resettokenandcredentials())
    sessionStorage.clear()
    navigate('/auth/login')
  }
  useEffect(() => {
    dispatch(fetchcartitem(user?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={opencartsheet} onOpenChange={() => setopencartsheet(false)}>
        <Button
          onClick={() => setopencartsheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartitems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <CartWrapper
          setopencartsheet={setopencartsheet}
          cartitems={
            cartitems && cartitems.items && cartitems.items.length > 0
              ? cartitems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Header;
