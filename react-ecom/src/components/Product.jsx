import React from 'react'
import { Button, Card, CardBody, CardText, Container } from 'reactstrap'
import { BASE_URL } from '../services/axios-helper'

function Product({ product, addToCart }) {

    let imageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'contain',
        margin: '15px 0'
    }

    const getProductHtml = () => {
        return (
            <Card className='mt-2 border-0 shadow-sm' >

                <img style={imageStyle} src={BASE_URL + '/products/images/' + product.productId} alt="" />

                <CardBody>

                    <CardText><span className="text-mutted">{product.category.title}</span></CardText>

                    <h5>{product.productName}- {product.productId}</h5>
                    <CardText>
                        <span>{product.productDesc.slice(0, 20)}....</span>
                    </CardText>

                    <CardText>
                        Price : <b>₹ {product.productPrice}</b>
                    </CardText>

                    <Container className='text-center'>
                        <Button onClick={(event) => addToCart(product)} size='sm' color='success' >Add to Cart</Button>
                        <Button size='sm' className='ms-2' color='danger' >View Product</Button>
                    </Container>

                </CardBody>

            </Card>
        )
    }

    return (

        (product) && getProductHtml()

    )
}

export default Product