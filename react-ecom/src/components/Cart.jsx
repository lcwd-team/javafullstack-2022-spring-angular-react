import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { CardBody, Container, Card, CardText, Button, FormGroup, Input } from 'reactstrap'
import { context1 } from '../context'
import { getCart, removeItemFromCart as removeItem } from '../services/cart-service'
import Base from './Base'

function Cart() {

    const value = useContext(context1)
    const [cart, setCart] = useState(null)
    const [orderProceed, setOrderProceed] = useState(false)

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

    const removeItemFromCart = (item) => {
        removeItem(item.product.productId).then(data => {
            setCart(data)
            value.setCart(data)
        }).catch(error => {
            console.log(error)
        })
    }


    const cartItemsHtml = () => {
        return (<div className='mt-3'>
            {cart.items.map((item, index) => (
                <Card className="mt-2 border-0 shadow-sm" key={index}>
                    <CardBody>
                        <h3>{item.product.productName}</h3>
                        <CardText>
                            Quantity : <b>{item.quantity}</b>
                        </CardText>
                        <div>
                            <Button color='primary' className=' border-0 border rounded-0' size='sm'>Increase Quantity</Button>
                            <Button color='warning' className='ms-2 border-0 border rounded-0' size='sm'>Decrease Quantity</Button>
                            <Button onClick={(event) => { removeItemFromCart(item) }} color='danger' className='ms-2 border-0 border rounded-0' size='sm'>Remove Item</Button>
                        </div>

                        <CardText className='mt-3'>
                            Total Price : <b>{item.totalProductPrice}</b>
                        </CardText>

                    </CardBody>
                </Card>
            ))}

            <Container className='my-3 text-center'>
                <Button onClick={() => setOrderProceed(true)} color='success' size='lg'>Click here to proceed</Button>
            </Container>


        </div>)
    }


    const cartHtml = () => {
        return (
            <Container>
                <h1>Cart Items ( {cart.items.length} )</h1>

                {orderProceed ? orderProceedHtml() : cartItemsHtml()}
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
                    }} type='textarea' placeholder='Enter your addess here' />
                </FormGroup>

                <Container className='text-center'>
                    <Button onClick={()=>setOrderProceed(false)} color='secondary' size='lg'>Back</Button>
                    <Button color='success' className='ms-2' size='lg'>Create Order & Proceed for Payment</Button>
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