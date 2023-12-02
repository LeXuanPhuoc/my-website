import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet';
import {Container,Row,Col,Form,FormGroup} from "reactstrap"
import { Link,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import '../style/Login.css'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      const user = userCredential.user
      console.log(user);
      setLoading(false)
      toast.success('Đăng nhập thành công')
      navigate('/checkout')

    }catch(error){
      setLoading(false)
      toast.error(error.message)

    }
  }

  return <Helmet title="Login">
    <section>
      <Container>
        <Row>
          {loading ? <Col lg='12' className='text-center'><h5>Loading....</h5></Col>:<Col lg="6" className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Đăng nhập</h3>

            <Form className='auth_from' onSubmit={signIn}>
              <FormGroup className='form__group'>
                <input type='email' placeholder='nhập email' 
                value={email} onChange={e => setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form__group'>
                <input type='password' placeholder='nhập mật khẩu'
                  value={password} onChange={e => setPassword(e.target.value)}/>
              </FormGroup>
              <button type='submit' className='buy__btn auth__btn mt-5'>Login</button>
              <p className='mt-4'>Bạn chưa có tài khoản ?{""} <Link to="/signup">Tạo tài khoản ngay</Link></p>
            </Form>
          </Col>}
        </Row>
      </Container>
    </section>

  </Helmet>
}

export default Login;