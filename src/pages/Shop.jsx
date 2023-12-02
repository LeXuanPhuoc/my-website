import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container,Row,Col } from 'reactstrap';
import'../style/shop.css';

import products from '../assets/data/products';
import ProductList from '../components/UI/ProductList'
const Shop = () => {

  const [productsData, setProductData] =useState (products)

  const handleFilter = e =>{
    const filterValue = e.target.value

   
      if(filterValue==='Category'){
      setProductData(products)
    }

    if(filterValue==='sofa'){
      const filteredProducts = products.filter(
        (item) => item.category==="sofa"
      )
      setProductData(filteredProducts)
    }

    if(filterValue==='mobile'){
      const filteredProducts = products.filter(
        (item) => item.category==="mobile"
      )
      setProductData(filteredProducts)
    }

    if(filterValue==='chair'){
      const filteredProducts = products.filter(
        (item) => item.category==="chair"
      )
      setProductData(filteredProducts)
    }

    if(filterValue==='watch'){
      const filteredProducts = products.filter(
        (item) => item.category==="watch"
      )
      setProductData(filteredProducts)
    }
    if(filterValue==='wireless'){
    const filteredProducts = products.filter(
  (item) => item.category === "wireless"
    )
    setProductData(filteredProducts)
  }


    if(filterValue==='Diamond'){
      const filteredProducts = products.filter(
        (item) => item.category==="Diamond"
      )
      setProductData(filteredProducts)
    }
  };

  const handlSearch = e => {
    const searchTerm = e.target.value
    const searchedProducts = products.filter(item =>item.productName.
      toLowerCase().includes(searchTerm.toLowerCase()))
      setProductData(searchedProducts);

  }
  
  return (
    <Helmet title='Shop'>
      <CommonSection title="Sản Phẩm" />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6' >
              <div className='filter__widget'>
                <select onChange={handleFilter}>
                  <option value='Category'>Danh mục</option>
                  <option value='sofa'>Sofa</option>
                  <option value='mobile'>Điện thoại di động</option>
                  <option value='chair'>Ghế</option>
                  <option value='watch'>Đồng hồ</option>
                  <option value='wireless'>Tai nghe</option>
                  <option value='Diamond'>Kim cương</option>
                  
                  
                </select>

              </div>
            </Col>
            <Col lg='3' md='6' className='text-end' >
            <div className='filter__widget'>
                <select>
                  <option>Sắp Xếp Theo</option>
                  <option value='ascending'>Tăng dần</option>
                  <option value='descending'>giảm dần</option>
                </select>

              </div>
           
            </Col>
            <Col lg='6' md='12' >
              <div className='search__box'>
                <input type='text' placeholder='Search............'
                onChange={handlSearch}/>
                <span>
                <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>

        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
            productsData.length === 0 ?(<h1 className='text-center fs-4'>Không tìm thấy sản phẩm nào!</h1>)
          :(
            <ProductList data={productsData}/>
          )}
           </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop;