import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap'
import { getOrders } from '../services/order-service'
import Base from './Base'

function Orders() {

  const [orders, setOrders] = useState(null)

  useEffect(() => {

    getOrders().then(data => {
      console.log(data)
      setOrders([...data])
    }).catch(error => {
      console.log(error)
      toast.error("Error in loading orders")
    })

  }, [])

  const htmlCode = () => {
    return (<Row>

      <Col md={{ size: 8, offset: 2 }} >    
       
        {orders.map((order)=>(
        <Card className='mt-2' key={order.orderId} >
          <CardBody>

            <CardText>
              ORDER NUMBER : MYSHOP{order.orderId}
            </CardText>

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
    </Base>
  )
}

export default Orders