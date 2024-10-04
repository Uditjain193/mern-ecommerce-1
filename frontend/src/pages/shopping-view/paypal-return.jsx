import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { capturepayment } from '../../redux/shop/orderslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

const Paypal = () => {
  const dispatch=useDispatch();
  const location =useLocation()
  const params=new URLSearchParams(location.search)
  const paymentId=params.get("paymentId")
  const payerId=params.get("PayerID")
  useEffect(()=>{
    if(paymentId&&payerId){
      const orderId=JSON.parse(sessionStorage.getItem("currentorderid"))
      dispatch(capturepayment({paymentId,payerId,orderId})).then((data)=>{
        if(data?.payload?.success){
          sessionStorage.removeItem("currentorderid")
          window.location.href="/shop/payment-success"
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[paymentId,payerId])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default Paypal