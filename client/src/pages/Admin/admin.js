import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
// import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
// import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { userRegister } from "../../redux/actions/userActions";
import Spinner from "../../components/Spinner";
// ..
AOS.init()
function AdminRegister() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
      console.log(values);
      
           dispatch(userRegister({...values,role:"admin"}))
           console.log(values)
    }

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img 
           className='w-100'
           data-aos='slide-left register-img'
           data-aos-duration='1500'
          src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1694&q=80" />
          <h1 className="login-logo">Car Rental</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AdminRegister;
