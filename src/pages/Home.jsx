import React, {useState,useEffect}from 'react'

import { link } from 'react-router-dom'
import { motion } from 'framer-motion'
import products from '../assets/data/products'

import Helmet from '../components/Helmet/Helmet'

import { Container,Row,Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img.png'

import "../style/home.css"
import { Link } from 'react-router-dom'

import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'

import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock'


const Home = () => {

  const [trendingProducts,setTrendingProduct] = useState([])
  const [bestSalesProducts,setBestSalesProduct] = useState([])

  const years = new Date().getFullYear();


  useEffect(() =>{
    const filterTrendingProducts = products.filter(
      item=> item.category === 'chair'
    ); 

    const filterBestSalesProducts = products.filter(
      item=> item.category === 'sofa'
    ); 

    setTrendingProduct(filterTrendingProducts)
    setBestSalesProduct(filterBestSalesProducts)
  }, []);

  return <Helmet title={' Home'}>
    <section className='hero__section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className='hero__content'>
              <p className='hero__subtitle'>Trending product in {years}</p>
              <h2>Make Your Interior More Minimalistic & Modern</h2>
              <p>We are committed to providing you with a great experience and comfortable living space.
                 Let us take care of every detail for you!</p>
              
              <motion.button whileTap={{scale:1.2}} className='buy__btn'><Link to='/shop'>SHOP NOW</Link></motion.button>

            </div>
          </Col>

          <Col lg='6'md='6' >
            <div className='hero__img'>
              <img src={heroImg} alt=''/>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
    <Services/>

    <section className='trending__products'>
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>
              Trending Products
            </h2>

          </Col>
          <ProductList data={trendingProducts}/>
        </Row>
      </Container>
    </section>
    
    <section className='best__sales'>
      <Container>
      <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>
              Best Sales
            </h2>

          </Col>
          <ProductList data={bestSalesProducts}/>
          
        </Row>
      </Container>
    </section>

   {/*  thời gian ưu đãi */}
    <section className='timer__count'>
      <Container>
        <Row>
          <Col lg="6" md="6">

            <div className='clock__top-content'>
               <h4 className='text-white fs-6 mb-2'>Ưu đãi có giới hạn</h4>
               <h3 className='text-white fs-5 mb-3'>Ghế bành chất lượng</h3>
            </div>
            <Clock/>
            <motion.button  whileTap={{scale: 1.2 }} className='button__btn store__btn'><Link to='/shop'>Mua sắm ngay</Link></motion.button>
          </Col>

          <Col lg="6"  md="6" className='text-end'>
            <img src={counterImg} alt=''/>
          </Col>
          <Row/>
        </Row>
      </Container>

    </section>
  
  </Helmet>
}
export default Home