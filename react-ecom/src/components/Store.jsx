import React, { useEffect, useState } from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import Base from './Base'
import Product from './Product'
import { loadProducts, loadProductsByCategory } from '../services/product-service'
import { loadCategories } from '../services/category-serivce'
import { Link, useParams } from 'react-router-dom'
function Store() {


  const {categoryId}=useParams()

  const [categories, setCategories] = useState(null)
  const [productDetail, setProductDetails] = useState(null)

  useEffect(() => {
    
    
    getProducts()  
    
    getCategories()
    
    console.log(categoryId)
  }, [categoryId])

  const getProducts = () => {

    let ob=null
    if(categoryId==='all'){
      ob= loadProducts()
    }else{
      ob=loadProductsByCategory(categoryId)  
    }
   
      ob.then(data => {
        console.log(data);
        setProductDetails(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getCategories = () => {
    loadCategories()
      .then(data => {
        console.log(data);
        setCategories(data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <Base>

      <div className="container-fluid px-5 mt-4">

        <Row className='mt-3'>


          <Col md="3">
            <h1>Categories</h1>

            <ListGroup>
              <ListGroupItem action tag={Link}  to="/store/all">All</ListGroupItem>

              {
                (categories) && categories.map(cat => (
                  <ListGroupItem action tag={Link} to={'/store/'+cat.categoryId} key={cat.categoryId}>{cat.title}</ListGroupItem>
                ))
              }

            </ListGroup>

          </Col>

          <Col md="9">
            <h1>Products</h1>

            <Row>

              {

                (productDetail) &&
                productDetail.content.map((item) => (
                  <Col md="6" lg="4" key={item.productId}>

                    <Product product={item} />

                  </Col>
                ))
              }

            </Row>

          </Col>

        </Row>


      </div>

    </Base>
  )
}

export default Store