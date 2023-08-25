import React from 'react'
import "./footer.css"
import { Container,Row,Col,ListGroup,ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
const Footer = () => {
  const year = new Date().getFullYear()
  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg='4'>
          <div className="logo">
            <div>
              <h1 className='text-white'><Link to='/home'>XPmart</Link></h1>
              </div>
            </div>
            <p className='footer__text mt-4'>Hãy khám phá thế giới mua sắm tại XPmart và đặt niềm tin vào chúng tôi.
             Cảm ơn bạn đã lựa chọn XPmart là nơi tin cậy để mua sắm!</p>
            </Col>
        <Col lg='3'>
          <div className='footer__quick-link'>
            <h4 className='footer__links-title'>Danh mục hàng đầu</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Điện thoại di động</Link>
              </ListGroupItem>
           
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Ghế Sofa</Link>
              </ListGroupItem>
            

            
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Ghế Bành</Link>
              </ListGroupItem>
            

            
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Đồng Hồ</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col lg='2'>
          <div className='footer__quick-link'>
            <h4 className='footer__links-title  '>Liên kết</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop'>Cửa hàng</Link>
              </ListGroupItem>
           
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/cart'>Giỏ hàng</Link>
              </ListGroupItem>
            
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/login'>Đăng nhập</Link>
              </ListGroupItem>
            

            
              <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Chính sách bảo mật</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
          </Col>

        <Col lg='3'>
          <div className='footer__quick-link'>
            <h4 className='footer__links-title'>Liên hệ</h4>
            <ListGroup className='footer__contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i class="ri-map-pin-line"></i></span>
                <p>1abc Quang Trung,Hải Châu,Đà Nẵng</p>
              </ListGroupItem>
           
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i class="ri-phone-line"></i></span>
                <p>+19001009</p>
              </ListGroupItem>
            
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i class="ri-mail-line"></i></span>
                <p>xuanphuocmtp@gmail.com</p>
              </ListGroupItem>
            </ListGroup>
          </div>
          </Col>
          <Col lg='12'>
            <p className='footer__copyright'>
              © {year} XPmart. Bản quyền thuộc về XPmarts.</p>
          </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer;