import { useDispatch } from "react-redux";
import Formm from "../../components/common/form";
import { loginFormControls } from "../../config/index";
import React, { useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginuser } from "../../redux/auth";

const Login = () => {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  function onsubmit(e) {
    e.preventDefault();
    dispatch(loginuser(formdata)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <Formm
        formcontrol={loginFormControls}
        buttontext={"Log In"}
        formdata={formdata}
        setformdata={setformdata}
        onsubmit={onsubmit}
      />
    </div>
  );
};

export default Login;
