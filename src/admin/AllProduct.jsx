import React from 'react'
import {Container,Row,Col} from "reactstrap"
import { db } from '../firebase.config'
import {doc,deleteDoc} from "firebase/firestore"
import useGetData from '../custom.hooks/useGetData'

import { toast } from 'react-toastify'
const AllProduct = () => {
  const {data:productsData,loading} =useGetData('product')

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db,'product',id));
    toast.success('Đã xóa sản phẩm!')
  }

  
  return<section>
    <Container>
      <Row>
        <Col lg="12">
          <table className='table'>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tiêu đề</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Hoạt động</th>

              </tr>
            </thead>
            <tbody>
              {loading ? 
                (
                <div class="loader text-center fw-bold">
                  <span class="loader-text">loading......</span>
                    <span class="load"></span>
                </div>)
               
                :
                (productsData.map(item=>(
                    <tr key={item.id}>
                  <td><img src={item.imgUrl} alt=''/></td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td> 
                   <button 
                    onClick={()=>{deleteProduct(item.id);
                    }} 
                    className='btn btn-danger'>Xóa 
                    <i class="ri-delete-bin-line"></i>
                   </button>
                  </td>
                </tr>
                  
                  )))}
            </tbody>

          </table>
        </Col>
      </Row>
    </Container>

  </section>
}

export default AllProduct