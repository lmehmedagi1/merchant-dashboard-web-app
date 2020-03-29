import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, WarningOutlined, MailOutlined, SecurityScanOutlined } from '@ant-design/icons';
import './login.css';
import auth, { getUser } from "../../auth";
import { Link } from "react-router-dom";
import FormItem from 'antd/lib/form/FormItem';


let email = "";
let newPassword = "";
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};



const Change = (props) => {

    const onFinish = values => {
        console.log(values);
        newPassword = values.password;
        //...
      };


    return (
        <div id="okvir">
             <div id="loginforma">
                <h2>Merchant Dashboard Login</h2>
                <article class="mw7 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
                
                <Form id="forma"
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >
                <Form.Item>
                    <h3>Change Password</h3>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input new Password!',
                    },
                    ]}
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                >
                    <Input.Password 
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>


                <Form.Item
                    name="token"
                    rules={[
                    {
                        required: true,
                        message: 'Please input the code!',
                    },
                    ]}
                >
                    <Input prefix={<SecurityScanOutlined className="site-form-item-icon" />} placeholder="Code" />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" > 
                    Confirm
                    </Button>
                </Form.Item>
                </Form>
                </article>
                <h5>Lima SI 2020</h5>
            </div>
        </div>
    );
};
        
export default Change;