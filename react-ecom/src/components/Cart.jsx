import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { CardBody, Container, Card, CardText, Button, FormGroup, Input, Col ,Row} from 'reactstrap'
import { context1 } from '../context'
import { addItemToCart, getCart, removeItemFromCart as removeItem } from '../services/cart-service'
import Base from './Base'
import { BASE_URL } from '../services/axios-helper'
import { createOrder as createOrderService } from '../services/order-service'

function Cart() {

    
    let imageStyle = {
        width: '100%',
        height: '100px',
        objectFit: 'contain',
        margin: '15px 0'
    }

    const value = useContext(context1)
    const [cart, setCart] = useState(null)
    const [orderProceed, setOrderProceed] = useState(false)
    const [orderDetail,setOrderDetail]=useState({
        address:'',
        cartId:''
    })
    const [orderCreated,setOrderCreated]=useState(false)

    useEffect(() => {
        setTimeout(() => {
            getCart().then(data => {
                setCart(data)
                value.setCart(data)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
        }, 2000)
    }, [])

    const changeQuantity=(productId,quantity)=>{
        addItemToCart(productId,quantity)
        .then(
           data=>{
            setCart({...data}) 
           }
        )
        .catch(error=>{
            console.log(error)
            toast.error("Error in changing the quantity")
        })
    }

    const removeItemFromCart = (item) => {
        removeItem(item.product.productId).then(data => {
            setCart(data)
            value.setCart(data)
        }).catch(error => {
            console.log(error)
        })
    }

    const createOrder=()=>{
        let f=window.confirm("Are you sure want to proceed ?")

        if(f==false){
            console.log(f)
            return;
        }
        //updating the cart id of order detail
        orderDetail.cartId=cart.cartId
        createOrderService(orderDetail).then((data)=>{
            toast.success("Order Created : Redirecting to payment page... ")
            setOrderCreated(true)
        })
        .catch(error=>{
            console.log(error)
            toast.error("Error in creating order")

             

        })
    }


    const cartItemsHtml = () => {
        return (<div className='mt-3'>
            {cart.items.map((item, index) => (
                <Card className="mt-2 border-0 shadow-sm" key={index}>
                    <CardBody>
                      <Row>
                        <Col md={8}>
                        <h3>{item.product.productName}</h3>
                        <CardText>
                            Quantity : <b>{item.quantity}</b>
                        </CardText>
                        <div>
                            <Button color='primary' onClick={()=>changeQuantity(item.product.productId,(item.quantity+1))} className=' border-0 border rounded-0' size='sm'>Increase Quantity</Button>
                            <Button color='warning' onClick={()=>changeQuantity(item.product.productId,(item.quantity-1))} className='ms-2 border-0 border rounded-0' size='sm'>Decrease Quantity</Button>
                            <Button onClick={(event) => { removeItemFromCart(item) }} color='danger' className='ms-2 border-0 border rounded-0' size='sm'>Remove Item</Button>
                        </div>

                        <CardText className='mt-3'>
                            Total Price : <b>{item.totalProductPrice}</b>
                        </CardText>

                        </Col>
                        <Col md={4}>
                        <img style={imageStyle} src={BASE_URL + '/products/images/' + item.product.productId} alt="" />

                        </Col>
                      </Row>
                    </CardBody>
                </Card>
            ))}

            <Container className='my-3 text-center'>
               { cart.items.length>0 ? (<Button onClick={() => setOrderProceed(true)} color='success' size='lg'>Click here to proceed</Button>):''  }
            </Container>


        </div>)
    }


    const cartHtml = () => {
        return (
            <Container>
                <h1>Cart Items ( {cart.items.length} )</h1>

                {orderProceed ? orderCreated?<h1>Order Created , Redirecting to payment page ..</h1> :orderProceedHtml() : cartItemsHtml()}
            </Container>
        )
    }


    const orderProceedHtml = () => {
        return (
            <div>
                <h1>Fill the detail :</h1>

                <FormGroup>
                    <Input style={{
                        height:'300px'
                    }} type='textarea' value={orderDetail.address} onChange={(event)=>setOrderDetail({...orderDetail,address:event.target.value})} placeholder='Enter your addess here' />
                </FormGroup>

                <Container className='text-center'>
                    <Button onClick={()=>setOrderProceed(false)} color='secondary' size='lg'>Back</Button>
                    <Button onClick={createOrder} color='success' className='ms-2' size='lg'>Create Order & Proceed for Payment</Button>
                </Container>

            </div>
        )
    }

    return (
        <Base >
            {cart ? cartHtml() : (
                <Container>
                    <h1>Loading .....</h1>
                </Container>
            )}
        </Base>
    )
}

export default Cart