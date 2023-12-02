import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet';
import {Container,Row,Col,Form,FormGroup} from "reactstrap"
import { Link } from 'react-router-dom';
import '../style/Login.css'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";

import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { setDoc,doc } from 'firebase/firestore';

import {auth} from '../firebase.config';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import {useNavigate} from "react-router-dom";


import {toast} from 'react-toastify';
const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()


  //
  const signup = async(e)=> {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password);

        const user = userCredential.user

        const storageRef = ref(storage,`images/${Date.now()+username}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          (error) => {
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              // cập nhật hồ sơ người dùng
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              });

              //lưu trữ dữ liệu người dùng trong cơ sở dữ liệu firestore
              await setDoc(doc(db,'users',user.uid),{
                uid: user.uid,
                displayName:username,
                email,
                photoURL:downloadURL,
              });



            });
          }
        );


      console.log(setDoc);
      setLoading(false)
      toast.success('Đăng ký thành công')
      navigate('/login')

    }catch(error){
      setLoading(false)
      toast.error("đã xảy ra sự cố lỗi")

    }
  }
  return <Helmet title="signup">
    <section>
      <Container>
        <Row>
        {  loading?<Col lg='12' className='text-center'>
          <h5 className='fw-bold'>Loading....</h5></Col> : <Col lg="6" className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Đăng ký</h3>

            <Form className='auth_from' onSubmit={signup}>
              <FormGroup className='form__group'>
                <input type='text' placeholder='nhập tên ' 
                value={username} onChange={e => setUsername(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='email' placeholder='nhập email ' 
                value={email} onChange={e => setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='password' placeholder='nhập mật khẩu'
                value={password} onChange={e => setPassword(e.target.value)}

                />
                
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='file' 
               onChange={e => setFile(e.target.files[0])}/>
              </FormGroup>

              <button type='submit' className='buy__btn auth__btn mt-5'>Đăng ký</button>
              <p className='mt-4'>Bạn đã có tài khoản ?{""} <Link to="/login">Đăng nhập</Link></p>
            </Form>
          </Col>}
        </Row>
      </Container>
    </section>

  </Helmet>
}

export default Signup;