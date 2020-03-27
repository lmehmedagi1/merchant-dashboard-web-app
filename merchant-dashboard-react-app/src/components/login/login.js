import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import auth from "../../auth";

const Login = (props) => {
  const onFinish = values => {
    console.log(values);
    // ovdje history.push('/main');
    auth.login(() => {
        props.history.push("/app");
    });

    /*message.loading("You are logging in...", 1.5)
      .then(() => {
          message.success("You are logged in!", 1.0);
          <Proba/>
      });*/
  };

  return (
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
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
  );
};

export default Login;