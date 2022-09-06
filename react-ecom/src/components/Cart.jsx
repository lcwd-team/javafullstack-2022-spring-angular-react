import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { CardBody, Container, Card, CardText, Button } from 'reactstrap'
import { getCart,removeItemFromCart as removeItem } from '../services/cart-service'
import Base from './Base'

function Cart() {

    const [cart, setCart] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            getCart().then(data => {
                setCart(data)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
        }, 2000)
    }, [])

    const removeItemFromCart=(item)=>{
        removeItem(item.product.productId).then(data=>{
            setCart(data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const cartHtml = () => {
        return (
            <Container>
                <h1>Cart Items ( {cart.items.length} )</h1>


                <div className='mt-3'>

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
                                    <Button onClick={(event)=>{removeItemFromCart(item)}} color='danger' className='ms-2 border-0 border rounded-0' size='sm'>Remove Item</Button>
                                </div>

                                <CardText className='mt-3'>
                                    Total Price : <b>{item.totalProductPrice}</b>
                                </CardText>

                            </CardBody>
                        </Card>
                    ))}

                    <Container className='my-3 text-center'>
                        <Button color='success' size='lg'>Click here to proceed</Button>
                    </Container>


                </div>

            </Container>
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