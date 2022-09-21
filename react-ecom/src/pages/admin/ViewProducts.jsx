import React, {useEffect, useState} from 'react'
import {
    Button,
    Card,
    CardBody,
    Col,
    Container, FormGroup, Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from "reactstrap";
import {deleteProduct, loadProducts} from "../../services/product-service";
import {toast} from "react-toastify";

function ViewProducts() {

    const [product, setProduct] = useState(null);

    useEffect(() => {

        loadProductFromServer(0)

    }, [])


    const loadProductFromServer = (pageNumber) => {
        loadProducts(pageNumber, 20).then(data => {
            console.log(data)
            setProduct(data)
        }).catch(error => {
            console.log(error)
            toast.error("Error in loading products")
        })
    }

    const deleteProductFromServer = (p) => {
        deleteProduct(p.productId).then(res => {
            console.log(res)
            let newProducts = product.content.filter(pr => pr.productId !== p.productId)
            setProduct({
                ...product,
                content: newProducts
            })
            toast.success("Product is deleted")
        })
            .catch(error => {
                console.log(error)
                toast.error("Error in deleting product")
            })

    }


    const viewProductHtml = () => {

        return (

            <Row>
                <Col md={12}>

                    <h3>Here is all prouducts</h3>

                    <FormGroup>
                        <Input placeholder={'Search product'} type={'text'}/>
                    </FormGroup>


                    <Table
                        bordered
                        borderless
                        responsive

                        hover
                        className={'bg-white text-center'}

                    >

                        <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.content.map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td>{p.productId}</td>
                                    <td>
                                        {p.productName}
                                    </td>
                                    <td>
                                        {p.productPrice}
                                    </td>
                                    <td>
                                        {p.stock ? "True" : "False"}
                                    </td>
                                    <td>
                                        {p.category.title}
                                    </td>
                                    <td>{p.productQuantity}</td>
                                    <td>
                                        <Button onClick={event => deleteProductFromServer(p)} color={'danger'}
                                                size={'sm'}>Delete</Button>
                                        <Button color={'warning'} size={'sm'} className={'ms-2'}>Update</Button>
                                        <Button color={'primary'} size={'sm'} className={'ms-2'}>View</Button>
                                    </td>

                                </tr>
                            )
                        })}
                        </tbody>


                    </Table>

                    <Pagination>


                        {
                            Array.from(Array(product.totalPages), (e, i) => (
                                <PaginationItem active={i === product.pageNumber}>
                                    <PaginationLink onClick={(() => loadProductFromServer(i))}>
                                        {i}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }

                        <PaginationItem disabled={product.lastPage}>
                            <PaginationLink
                                onClick={(event => loadProductFromServer(product.pageNumber + 1))}
                                next
                            />
                        </PaginationItem>

                    </Pagination>


                </Col>
            </Row>

        )

    }

    return (

        <Container>
            <Card>
                <CardBody>
                    {product && viewProductHtml()}
                </CardBody>
            </Card>
        </Container>

    )
}

export default ViewProducts