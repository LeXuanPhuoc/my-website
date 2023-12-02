import React,{useState} from 'react'
import {Container,Row,Col ,Form,FormGroup } from 'reactstrap'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

import{db,storage} from'../firebase.config'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { collection,addDoc } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app';
const AddProducts = () => {
 const[enterTitle,setEnterTitle] = useState('');
 const[enterShortDesc,setEnterShortDesc] = useState('');
 const[enterShortDescription,setEnterShortDescription] = useState('');
 const[enterCategory,setEnterCategory] = useState('');
 const[enterPrice,setEnterPrice] = useState('');
 const[enterProductImg,setEnterProductImg] = useState(null);
 const [loading,setLoading] = useState(false);

 const navigate = useNavigate()

 const addProduct = async(e) => {
  e.preventDefault();
  setLoading(true);

 

//======== thêm sản phẩm vào firebase database ==========
try{
 const docRef = await collection(db,'product')
 const storageRef = ref 
 (storage, `productImages/${Date.now() +enterProductImg.name}`)

 const UploadTask = uploadBytesResumable(storageRef,enterProductImg)

 UploadTask.on(()=>{
  toast.error("tải ảnh lên không thành công")
 },()=>{
  getDownloadURL(UploadTask.snapshot.ref).then(async(dowloadURL)=>{
  await addDoc(docRef,{
    productName:enterTitle,
    shortDesc:enterShortDesc,
    description:enterShortDescription,
    category:enterCategory,
    price:enterPrice,
    imgUrl:dowloadURL,

  })
  
 })
 setLoading(false)
 toast.success('Đã thêm sản phẩm thành công');
 navigate('/dashboard/all-products')
})

}catch(error){
  setLoading(false)
toast.error('lỗi thêm sản phẩm thất bại')
}


 }
  return <>
  <section>
    <Container>
      <Row>
        <Col lg='12'>
        {
          loading ? <h4 className='py-5 '>Loading....</h4> : <>
            <h3 className='d-flex justify-content-center mb-5'>Thêm sản phẩm</h3>
          <Form onSubmit={addProduct}>
            <FormGroup className='form__group'>
              <span>Tiêu đề sản phẩm</span>
              <input type='text' placeholder='Double sofa' required
              value={enterTitle} onChange={e =>setEnterTitle(e.target.value)}/>
            </FormGroup>
            <FormGroup className='form__group'>
              <span>Mô tả ngắn</span>
              <input type='text' placeholder='Mô tả ngắn....' required value={enterShortDesc} onChange={e =>setEnterShortDesc(e.target.value)}/>
            </FormGroup>
            <FormGroup className='form__group'>
              <span>chi tiết</span>
              <input type='text' placeholder='chi tiết....' required value={enterShortDescription} onChange={e =>setEnterShortDescription(e.target.value)}/>
            </FormGroup>
            <div className='d-flex align-items-center justify-content-between gap-5'>
            <FormGroup className='form__group w-100'>
              <span>giá</span>
              <input type='number' placeholder='$100' required value={enterPrice} onChange={e =>setEnterPrice(e.target.value)}/>
            </FormGroup>

            <FormGroup className='form__group w-50'>
              <span>Loại</span>
              <select className='p-2 w-100' value={enterCategory} onChange={e =>setEnterCategory(e.target.value)} >
                <option >chọn danh mục</option>
                <option value="chair">Ghế</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Điện thoại</option>
                <option value="watch">Đồng hồ</option>
                <option value="wireless">Tai nghe</option>
                 <option value="otherProducts">Sản phẩm khác...</option>
                
              </select>
            </FormGroup>
            </div>
            <div>
            <FormGroup className='form__group'>
              <span>Ảnh sản phẩm</span>
              <input type='file'  
              onChange={e => setEnterProductImg(e.target.files[0]) }
              required
              />
            </FormGroup>
            </div>
            <button className='buy__btn'>
              Thêm Sản Phẩm
            </button>
          </Form>
          </>
        }
        </Col>
      </Row>
    </Container>
  </section>
  </>
};

export default AddProducts