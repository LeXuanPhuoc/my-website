import React from 'react'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet';
import CommonSection from'../components/UI/CommonSection'
import '../style/checkout.css'
import{useSelector} from "react-redux"
const Checkout = () => {
  const totalQty = useSelector(state=>state.cart.totalQuantity)
  const totalAmount = useSelector(state=>state.cart.totalAmount)



  return (<Helmet title='Checkout'>
    <CommonSection title='Thanh toán'/>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <h6 className='mb-4 fw-blold'>Thông tin thanh toán</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input type='text' placeholder='Nhập tên của bạn' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type='email' placeholder='Nhập email của bạn' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type='number' placeholder='Số điện thoại' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='text' placeholder='tỉnh thành' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type='text' placeholder='địa chỉ chi tiết' />
              </FormGroup>
            </Form>

            
          </Col>
          <Col lg="4">
            <div className='checkout__cart'>
              <h6>Tổng số lượng: <span>{totalQty} items</span></h6>
              <h6>Tiền sản phẩm: <span>${totalAmount}</span></h6>
              <h6><span>Phí vận chuyển:<br/>miễn phí vận chuyển</span> <span>$0</span></h6>
              
              <h4>Tổng tiền: <span>{totalAmount}</span></h4>
              <button className=' buy__btn auth__ntn w-100 '>Đặt hàng </button>
            </div>
           
          </Col>
        </Row>
      </Container>
    </section>

  </Helmet>
  )
}

export default Checkout