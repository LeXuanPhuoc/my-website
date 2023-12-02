

import React,{useState,useEffect,useRef} from 'react'

import { Container,Row,Col, Button } from 'reactstrap'
import { useParams } from 'react-router-dom'
// import prducts from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../style/productDetails.css'

import {  toast } from 'react-toastify';
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import products from '../assets/data/products'

import { db } from '../firebase.config'
import {doc, getDoc} from 'firebase/firestore'
import useGetData from '../custom.hooks/useGetData'

const ProductDetails = () => {

  const[product,setProduct] = useState({})

  const [tab,settab] = useState('desc')
  const reviewUsers = useRef('')
  const reviewMsg = useRef('')


  const [rating,setRating] = useState(null)
  const {id}= useParams();
  // const product = prducts.find((item)=> item.id===id);
  const {data: products} = useGetData('product')


  const docRef = doc (db, 'product', id)
  useEffect(()=>{
    const getProduct = async()=>{
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()) {
        setProduct(docSnap.data())
    }else{
      console.log('no product ');
    }
  }
  getProduct()
  },[])
  const {
    imgUrl, 
    productName, 
    price, 
    // avgRating, 
    // reviews, 
    description,
    shortDesc,
    category
  }= product;
  const relateProduct = products.filter((item)=> item.category===category);
  const dispatch =useDispatch();
  
  const submitHandler =(e) => {
    e.preventDefault()

    const reviewUsersName = reviewUsers.current.value
    const reviewUsersMsg = reviewMsg.current.value
    
    
    const reviewObj = {
      UserName:reviewUsersName,
      text:reviewUsersMsg,
      rating,
      
    }
  console.log(reviewObj)
   toast.success("Đã gửi đánh giá")
  };



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

  //sự kiện trang sẽ cuộn đầu trang khi product thay đổi.
  useEffect(() => {
    window.scrollTo(0, 0);
  },[product])
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
                  <span ><i class="ri-star-s-fill"></i></span>
                  <span ><i class="ri-star-s-fill"></i></span>
                  <span ><i class="ri-star-s-fill"></i></span>
                  <span  ><i class="ri-star-s-fill"></i></span>
                  <span ><i class="ri-star-half-s-fill"></i></span>
                </div>
                {/* <p>đánh giá (<span>{avgRating}</span>)</p> */}
              </div>
              <div className='d-flex align-items-center gap-5'>
              <span className='price fs-4'>{price} $</span>
              <span className='category'>Category: {category}</span>

              </div>
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
                <h6 className={`${tab ==='desc'?'active__tab' :"" }`} 
                onClick={() => settab('desc')}
                >
                   Miêu tả</h6>
                {/* <h6 className={`${tab ==='rev'?'active__tab' :"" }`}
                onClick={() => settab('rev')}
                >Đánh giá({reviews.length})</h6> */}
              </div>
              {
                tab ==='desc' ? (
                 
              <div className="tab__content mt-4">
                <p>{productName} {description}</p>
              </div>
                ) : (
                  <div className='product__review mt-4'>
                    <div className='review__wrapper'>
                      {/* <ul>
                        {
                          reviews ?.map((item,index)=>(
                            <li kew={index} className='mb-4'>
                              <h6>Nguyễn A</h6>
                              <span>{item.rating} (đánh giá)</span>
                            <p>{item.text}</p>
                            </li>
                            ))}
                      </ul> */}
                      <div className='review__form'>
                        <h4>Để lại đánh giá của bạn</h4>
                        <form action='' onSubmit={submitHandler}>
                          <div className='form__group'>
                            <input type='text' placeholder="Nhập tên"
                            ref={reviewUsers}
                            required
                            
                            />
                            
                          </div>


                          <div className='form__group d-flex align-items-center gap-5 rating__group'>
                            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(1)}>1<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(2)}>2<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(3)}>3<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}} onClick={()=> setRating(4)}>4<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.2}}  onClick={()=> setRating(5)}>5<i class="ri-star-fill"></i></motion.span>
                          </div>

                          <div className='form__group'>
                            <textarea 
                            ref={reviewMsg}
                            rows={4} 
                            type='text' 
                            placeholder="Nội dung đánh giá..."
                            required
                            />
                            
                          </div>

                          <motion.button whileTap={{scale:1.2}} type='submit' className='buy__btn'>Gửi ngay</motion.button>

                        </form>

                      </div>

                    </div>
                  </div>
                )
              }


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