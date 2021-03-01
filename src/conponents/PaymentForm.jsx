import React, { useState } from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStrip} from '@stripe/stripe-js';
import Review from './Review';
import axios from 'axios';
const PaymentForm = ({cart,backStep,shippingData,nextStep,setCart,setIndexCart}) => {
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const time = new Date().toLocaleDateString();
    const listItem= cart.map((list)=>{
        return list.name +' X'+list.qty;
    })
    const onClickOrder=()=>{
        setCart([]);
        setIndexCart(0);
        
        let url='https://600e76d03bb1d100179df304.mockapi.io/orderDetails';
        axios({
            method:'POST',
            url:url,
            data:{
                createdAt:  time,
                customerName: shippingData.firstName +' '+ shippingData.lastName,
                listProduct : listItem,
                address: shippingData.adress,
                phone: shippingData.phone,
                email:shippingData.email,
                totalOrder: totalPrice,
                status:'not confirmed yet',
            }
        },[]);
        nextStep();
    }
    return (
        <>
            <Review shippingData={shippingData} cart={cart}/>
            <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button onClick={backStep} color='secondary' variant='outlined'>Back</Button>
                        <Button  onClick={()=>{onClickOrder()}} color='primary' variant='contained'> Order  {totalPrice} $</Button>
                    </div>
        </>
    )
}

export default PaymentForm