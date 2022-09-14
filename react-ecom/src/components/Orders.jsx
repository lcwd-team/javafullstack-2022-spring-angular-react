import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardText, Col, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { getOrders } from '../services/order-service'
import Base from './Base'
import { BASE_URL } from '../services/axios-helper'

function Orders() {


  let imageStyle = {
    width: '100%',
    height: '100px',
    objectFit: 'contain',
    margin: '15px 0'
  }

  const [orders, setOrders] = useState(null)
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  const closeModal = () => setModal(false);
  const openModal = (order) => {
    setSelectedItem(order)
    setModal(true)
  };


  useEffect(() => {

    getOrders().then(data => {
      console.log(data)
      setOrders([...data])
    }).catch(error => {
      console.log(error)
      toast.error("Error in loading orders")
    })

  }, [])




  const formatDate = (time) => {
    return new Date(time).toDateString()
  }



  const modalHtml = () => {
    return (
      <Modal isOpen={modal} toggle={closeModal} size='lg' centered={true} >
        <ModalHeader toggle={closeModal}>Products of order {selectedItem && 'MYSHOP'+selectedItem.orderId}</ModalHeader>
        <ModalBody>

          {
            selectedItem && selectedItem.items.map((item, index) => (
              <Card className="mt-2 border-0 shadow-sm" >
                <CardBody>

                  <Row key={index}>
                    <Col md={8}>
                      <h3>{item.product.productName}</h3>
                      <CardText>
                        Quantity : <b>{item.quantity}</b>
                      </CardText>


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
            ))
          }


        </ModalBody>
      
      </Modal>
    )
  }

  const htmlCode = () => {
    return (<Row>

      <Col md={{ size: 8, offset: 2 }} >

        {orders.map((order) => (
          <Card className={order.paymentStatus == 'PAID' ? 'border-success mt-2' : 'border-danger mt-2'} key={order.orderId} >
            <CardBody>

              <Row className="mt-2">
                <Col md={6}>

                  <CardText>
                    ORDER NUMBER : <b> MYSHOP{order.orderId}</b>
                  </CardText>
                </Col>
                <Col md={6}>
                  CREATED AT: <b>{formatDate(order.orderCreated)}</b>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>

                  <CardText>
                    ORDER STATUS : <b> {order.orderStatus}</b>
                  </CardText>
                </Col>
                <Col md={6}>
                  ORDER AMOUNT: <b>₹ {order.orderAmount}</b>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>

                  <CardText>
                    PAYMENT STATUS : <b className={order.paymentStatus == 'PAID' ? 'text-success' : 'text-danger'}> {order.paymentStatus}</b>
                  </CardText>
                </Col>
                <Col md={6}>
                  ORDER DELIVERED: <b>{order.orderDelivered ? formatDate(order.orderDelivered) : 'Not delivered yet'}</b>
                </Col>
              </Row>

              <CardText className='mt-2 text-muted'>
                {order.billingAddress}
              </CardText>

              <Container className='text-center'>

                {order.paymentStatus == 'NOT PAID' ? <Button color='success' className='border-0' size='sm'>Pay Now</Button> : ''}
                <Button color='primary' size='sm' className='ms-2' onClick={() => openModal(order)}>View Products</Button>
              </Container>


            </CardBody>


          </Card>
        ))
        }

      </Col>
    </Row>
    )
  }

  return (
    <Base>
      <Container>
        {orders ? htmlCode() : <h1>Loading .....</h1>}
      </Container>
      {modalHtml()}
    </Base>


  )
}

export default Orders