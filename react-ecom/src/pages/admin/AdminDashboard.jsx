import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import Base from '../../components/Base'
import {checkAdminUser} from "../../auth";

function AdminDashboard() {

    function adminDashboardHtml() {
        return (
            <>
                <Base>


                    <div className='container-fluid'>
                        <Row className='p-4'>
                            <Col md={2}>

                                <ListGroup>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/home'}
                                                   action="true">Home</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/products'} action="true">View
                                        Products</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/add-product'} action="true">Add
                                        Product</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/categories'} action="true">View
                                        Categories</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/add-category'} action="true">Add
                                        Category</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/orders'} action="true">Manger
                                        Orders</ListGroupItem>
                                    <ListGroupItem tag={Link} to={'/admin-dashboard/users'} action="true">Manger
                                        Users</ListGroupItem>
                                    <ListGroupItem action="true">Logout</ListGroupItem>
                                </ListGroup>

                            </Col>
                            <Col md={10}>
                                <Outlet/>
                            </Col>
                        </Row>

                    </div>
                </Base>
            </>
        )
    }


    return checkAdminUser() ? adminDashboardHtml() : <h1>Your are not a admin..</h1>

}

export default AdminDashboard