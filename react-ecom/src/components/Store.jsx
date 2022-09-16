import React, { useEffect, useState } from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import Base from './Base'
import Product from './Product'
import { loadProducts, loadProductsByCategory } from '../services/product-service'
import { loadCategories } from '../services/category-serivce'
import { Link, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { addItemToCart as addCart } from '../services/cart-service'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { context1 } from '../context'

function Store() {

  const value = useContext(context1)


  const { categoryId } = useParams()

  const [categories, setCategories] = useState(null)
  const [productDetail, setProductDetails] = useState(null)
  const [pageNumber, setPageNumber] = useState({
    count: 0
  })

  const [flag, setFlag] = useState(true)

  useEffect(() => {

    if (flag) {
      console.log("Initial time")
      getCategories()
      setFlag(false)
    } else {
      console.log("Not initial time")
      setProductDetails(null)
      setPageNumber({ count: 0 })

    }
    console.log(categoryId)
  }, [categoryId])




  useEffect(() => {
    console.log("Page number :" + pageNumber.count)
    getProducts(pageNumber.count)
  }, [pageNumber])


  const getProducts = (pageNumber) => {
    let ob = null
    if (categoryId === 'all') {
      ob = loadProducts(pageNumber)
    } else {
      ob = loadProductsByCategory(categoryId, pageNumber)
    }

    ob.then(data => {
      console.log(data);
      if (productDetail) {

        setProductDetails({
          content: [...productDetail.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages
        })

      } else {
        setProductDetails(data)
      }

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

  const loadMoreComponent = () => {
    console.log("loading more")
    setPageNumber({ count: pageNumber.count + 1 })

  }

  //add item to card
  const addItemToCart = (product) => {

    if (!product.stock) {
      toast.error("product is not in stock...")
      return;
    }
    console.log(product)
    addCart(product.productId, 1)
      .then((data) => {
        console.log(data)
        value.setCart(data)
        toast.success("Item Added to Cart")
      }).catch(error => {
        console.log(error)
      })

  }

  const getInfiniteScrollWitContent = () => {
    return (<InfiniteScroll
      dataLength={productDetail.content.length}
      next={loadMoreComponent}
      hasMore={!productDetail.lastPage}
      loader={<h4>Loading...</h4>}
    >

      <Row>
        {
          (productDetail) &&
          productDetail.content.map((item, index) => (
            <Col md="6" lg="4" key={index}>

              <Product addToCart={addItemToCart} product={item} />

            </Col>
          ))
        }
      </Row>
    </InfiniteScroll>)
  }

  return (
    <Base>

      <div className="container-fluid px-5 mt-4">

        <Row className='mt-3'>


          <Col md="3">
            <h1>Categories</h1>

            <ListGroup>
              <ListGroupItem action tag={Link} to="/store/all">All</ListGroupItem>

              {
                (categories) && categories.map(cat => (
                  <ListGroupItem action tag={Link} to={'/store/' + cat.categoryId} key={cat.categoryId}>{cat.title}</ListGroupItem>
                ))
              }

            </ListGroup>

          </Col>

          <Col md="9">
            <h1>Products</h1>


            {productDetail && getInfiniteScrollWitContent()}


          </Col>

        </Row>


      </div>

    </Base>
  )
}

export default Store