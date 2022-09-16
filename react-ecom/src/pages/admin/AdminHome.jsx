import React from 'react'
import { Button, Card, CardBody } from 'reactstrap'

function AdminHome() {
    return (
        <Card>
            <CardBody className='text-center'>

                    <h1>Welcome to admin dashboard</h1>
                    <p>Start adding the products and managing the orders from here.</p>
                    <Button color='danger'>Add Products</Button>

            </CardBody>
        </Card>
    )
}

export default AdminHome