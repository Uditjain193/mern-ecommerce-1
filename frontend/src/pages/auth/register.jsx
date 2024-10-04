import { useDispatch } from "react-redux";
import Formm from "../../components/common/form";
import { registerFormControls } from "../../config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registeruser } from "../../redux/auth";
import { useToast } from "../../components/ui/use-toast";
const Register = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  function onsubmit(e) {
    e.preventDefault();
    dispatch(registeruser(formdata)).then((data) => {
      if (data?.payload?.success) {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <Formm
        formcontrol={registerFormControls}
        buttontext={"Sign Up"}
        formdata={formdata}
        setformdata={setformdata}
        onsubmit={onsubmit}
      />
    </div>
  );
};

export default Register;
