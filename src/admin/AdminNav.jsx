import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import useAuth from '../custom.hooks/useAuth'
import '../style/AdminNav.css'

import { NavLink } from 'react-router-dom'
const admin__nav = [
  {
    diplay:"Bản điều khiển",
    path:'/dashboard'
  },
  {
    diplay:"Tất cả sản phẩm",
    path:'/dashboard/all-products'
  },
  {
    diplay:"Đặt hàng",
    path:'/dashboard/orders'
  },
  {
    diplay:"Người dùng",
    path:'/dashboard/users'
  },
]
const AdminNav = () => {
  const{currentUser} = useAuth()

  return<> <header className="admin__header">
    <div className='admin__nav-top' >
      <Container>
        <div className='admin__nav-wrapper-top'>
          <div className='logo'>
            <h2>XPmart</h2>

          </div>
          <div className='search__box'>
            <input type="text" placeholder="Seach...." />
            <span> <i class="ri-search-line"></i></span>

            </div>
            <div className='admin__nav-top-right'>
              <span><i class="ri-notification-3-line"></i></span>
              <span><i class="ri-settings-2-line"></i></span>
              <img src={currentUser && currentUser.photoURL} alt=''/>

            
          </div>

        </div>
      </Container>
       </div>
  </header>
  <section className="admin_menu p-0">
    <Container>
      <Row>
        <div className='admin__navigation'>
          <ul className='admin__menu-list'>
            {
              admin__nav.map((item,index) => (
                <li className='admin__menu-item' key={index}>
                  <NavLink to={item.path} className={
                     navClass => navClass.isActive ? 'active__admin-menu' : ""}>
                      {item.diplay}
                  </NavLink>
                </li>

              )
              )
            }

          </ul>
        </div>
      </Row>
    </Container>

  </section>
  </>
}

export default AdminNav