

import React from 'react'

import { Container,Row,Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import prducts from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'

import {  toast } from 'react-toastify';
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import products from '../assets/data/products'
const ProductDetails = () => {
  const {id}= useParams();
  const product = prducts.find((item)=> item.id===id);
  const {
    imgUrl, 
    productName, 
    price, 
    avgRating, 
    reviews, 
    description,
    shortDesc,
    catrgory
  }= product;
  const relateProduct = products.filter((item)=> item.catrgory===catrgory);
  const dispatch =useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
       id,
       productName,
       price,
       image:imgUrl,
    })
    );
    toast.success('sản phẩm được thêm thành công');
  };

  return (
    <Helmet title={productName}>
      <CommonSection title={productName}/>

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName}/></Col>

            <Col lg="6">
              <div className='product__details'>
                <h2>{productName}</h2>
              
              <div className='product__rating d-flex align-item-center gap-2 mb-3'>
                <div>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-half-s-fill"></i></span>
                </div>
                <p>đánh giá (<span>{avgRating}</span>)</p>
              </div>
              <span className='price fs-4'>{price} $</span>
               <p className='mt-3'>{productName} {shortDesc}</p>
               <motion.button whileTap={{scale:1.1}} 
               className='buy__btn'onClick={addToCart}>Thêm vào giỏ hàng</motion.button>
            </div>

            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg={12} >
              <div className="tab__wrapper d-flex align-items-center gap-5 mt-5">
                <h6>Miêu tả</h6>
                <h6>Đánh giá({reviews.length})</h6>
              </div>

              <div className="tab__content mt-3">
                <p>{productName} {description}</p>
              </div>

            </Col>
            <Col lg={12} className='mt-5' >
             <h2 className='related__title'>Sản phẩm khác:</h2>
            </Col>
            <ProductList data={relateProduct}/>
          </Row>
        </Container>
      </section>
      
            
            
    </Helmet>
  )
}

export default ProductDetails