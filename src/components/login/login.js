import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import auth, { getUser } from "../../auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const onFinish = values => {
    console.log(values);
    auth.login(() => {
        if (getUser().name)
          document.getElementById("imeKorisnika").textContent=getUser().name + " " + getUser().surname;
        props.history.push("/app");
    }, values);
  };

  return (
    <div id="okvir">
    <div id="loginforma">
    <h2>Merchant Dashboard Login</h2>
    <article class="mw6 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
    
    <Form id="forma"
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to='/recover-password'>
          <span className="login-form-forgot">Forgot password</span>
        </Link>

      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" > 
          Log in
        </Button>
      </Form.Item>
    </Form>
    </article>
    <h5>Lima SI 2020</h5>
    </div>
    </div>
  );
};

export default Login;