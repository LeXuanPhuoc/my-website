import React,{useRef,useEffect} from 'react'

import {Link, NavLink,useNavigate} from 'react-router-dom'
import'./Header.css'

import {motion} from 'framer-motion'

import logo from '././../../assets/images/eco-logo.png'
import user_icon from '../../assets/images/user-icon.png'

import {Container , Row} from 'reactstrap'
import {  useSelector } from 'react-redux'
import useAuth from '../../custom.hooks/useAuth';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'



const nav__Links =[
{
  path:'home',
  display:'Home'
},
{
  path:'shop',
  display:'Shop'
},
{
  path:'cart',
  display:'Cart'
}
];

const Header = () => {

  const headerRef = useRef(null)
  const totalQuantity = useSelector(state =>state.cart.totalQuantity)
 const profileActionRef = useRef(null)


  const menuRef = useRef(null)
  const navigate = useNavigate()
  const {currentUser} = useAuth()
  
  const stickyHeaderFunc = ()=> {
    window.addEventListener('scroll', ()=> {
      if (
        document.body.scrollTop >80 || 
        document.documentElement.scrollTop >80) {

        headerRef.current.classList.add('sticky__header')
      }else { 
        headerRef.current.classList.remove('sticky__header')
      }
    })
  };
  //Đăng xuất
  const logout = ()=> {
  signOut(auth).then(()=> {
    toast.success('đã Đăng xuất')
    navigate('/home')

  }).catch(err=> {
    toast.error(err.message)
  })
  };
useEffect(() => {
  stickyHeaderFunc();
  return () => window.removeEventListener("scroll", stickyHeaderFunc);
});
const menuToggle = ()=> menuRef.current.classList.toggle('active__menu');

const navigateTocart =()=> {
  navigate("/cart");


  

};
const toggleProfileActions = () => 
  profileActionRef.current.classList.toggle('show__profileActions');


  return( <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt='logo'/>
            <div>
              <h1><Link to='/home'>XPmart</Link></h1>
             
            </div>
          </div>

          <div className='navigation' ref={menuRef} onClick={menuToggle}>
            <ul className='menu'>
            {
              nav__Links.map((item,index) => (
                <li className='nav__item' key={index}>
                <NavLink
                 to={item.path}
                 className={(navClass) =>
                navClass.isActive ? 'nav__active':''}>
                  {item.display}</NavLink>
                  </li>
           )) }
            </ul>
          </div>
          <div className='nav__icons'>

            <span className="fav__icon">
              <i class="ri-heart-line"></i>
              <span className="badge">1</span>
              </span>
              
            <span className="cart__icon" onClick={navigateTocart}>
              <i class="ri-shopping-bag-line"></i>
              <span className="badge">{totalQuantity}</span>
              </span>
              

              <div className='profile'>
                <motion.img whileTap={{scale: 1.3}} src= {currentUser? currentUser.photoURL: user_icon} 
              alt='user_icons'
              onClick={toggleProfileActions}
              />
              

              <div className='profile__actions' ref={profileActionRef}
              onClick={toggleProfileActions}>
              {currentUser ? <span onClick={logout}>Đăng xuất</span>
              :
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <Link to='/signup'>Đăng ký</Link>
                <Link to='/login'>Đăng nhập</Link>
                <Link to='/dashboard'>Bản điều khiển</Link>
                </div>}
              </div>
              </div>
              

            <div className='moblile__menu'>
            <span onClick={menuToggle}>
              <i class="ri-menu-line"></i>
            </span>
            </div>


          </div>
          
      </div>
      </Row>
    </Container>
  </header>
  )
}

export default Header;