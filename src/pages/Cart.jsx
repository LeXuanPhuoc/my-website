import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container,Row,Col } from 'reactstrap'
import'../style/cart.css'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import {CartActions, cartActions } from '../redux/slices/cartSlice'
import { useSelector,useDispatch } from "react-redux"
const Cart = () => {
  const cartItems = useSelector(state=>state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet  title={'Cart'} >
      <CommonSection title="Giỏ Hàng"/>

      <section>
        <Container>
          <Row>
            <Col lg='9' >
              {
                cartItems.length ===0 ? <h2 className=' text-center'>Chưa sản phẩm nào trong giỏ hàng!</h2> :
                <table className='table brodered'>
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tiêu đề</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <motion.th whileTap={{scale:1.2}}>Xóa</motion.th>
                  </tr>
                </thead>

                <tbody>
                 {
                  cartItems.map((item,index) => (
                  <Tr item={item} key={index}/>
                  ))
                 }
                </tbody>
              </table>
              }
            </Col>
            <Col lg="3">
              <div>
                <h6 className='d-flex align-items-center 
                justify-content-between'>Tổng Cộng
                <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
                
              </div>
              <p className='fs-6 mt-2'>Thuế và phí vận chuyển sẽ được tính khi thanh toán</p>
              <div className='checkout'>
                <button className="buy_btn w-100"><Link to='/shop'>Tiếp tục mua sắm</Link></button>
              
                <button className="buy_btn w-100"><Link to='/checkout'>Thanh toán</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  )
};
const Tr =({item})=>{
  const dispatch = useDispatch()

  const deleteProduct =()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  return(
  <tr >
  <td><img src={item.imgUrl} alt=''/></td>
  <td>{item.productName}</td>
  <td>{item.price} $</td>
  <td>{item.quantity}</td>

  <td><motion.i whileTap={{scale:1.5}}
  onClick={deleteProduct} class="ri-delete-bin-line"></motion.i></td>
</tr>
  )
}

export default Cart