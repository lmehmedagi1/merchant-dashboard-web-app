import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, MailOutlined, SecurityScanOutlined } from '@ant-design/icons';
import './login.css';
import axios from 'axios';


let email = "";
let newPassword = "";
let token = "";
const Recover = (props) => {

    const onFinishPassword = values => {
        newPassword = values.password;
        token = values.token;
        axios
        .post('https://main-server-si.herokuapp.com/api/user/savePassword', {
            newPassword: newPassword,
            token: token
        }).then((response) => {
            if (response.data.length === 0) {
                message.error("Something went wrong!");
                return;
            }
            window.location.href = '/';
        }).catch(error => {
            if (error.response == null) {
                message.error("Please check your internet connection!");
                return;
            }
            if (error.response.status === 401)
                message.error("Invalid Code!");
            else
                message.error(error.response.data.message);
        });
    }

    const onFinish = values => {
        email = values.email;
        axios
        .post('https://main-server-si.herokuapp.com/api/user/resetPassword', {
            email: email
        }).then((response) => {
            if (response.data.length === 0) {
                message.error("Something went wrong!");
                return;
            }
            window.location.href = `/recover-password/${email}`;
        }).catch(error => {
            if (error.response == null) {
                message.error("Please check your internet connection!");
                return;
            }
            if (error.response.status === 401)
                message.error("Invalid Email!");
            else
                message.error(error.response.data.message);
        });

    };

    if (props.match.params.email) {
        email = props.match.params.email;
        return (
            <div id="okvir">
                 <div id="loginforma">
                    <h2>Merchant Dashboard Login</h2>
                    <article className="mw7 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
                    
                    <Form id="forma"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishPassword}
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
                            return Promise.reject('Password does not match!');
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
                    <p>Input the code we sent to your Email!</p>
                    <Form.Item
                        name="token"
                        rules={[
                        {
                            required: true,
                            message: 'Please input the code!',
                        },
                        ]}
                    >
                    <Input 
                        prefix={<SecurityScanOutlined className="site-form-item-icon" />} 
                        placeholder="Code"
                    />
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
    }
    else {
        return (
            <div id="okvir">
                <div id="loginforma">
                    <h2>Merchant Dashboard Login</h2>
                    <article className="mw7 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
                    
                    <Form id="forma"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item>
                        <h3>Recover Password</h3>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(getFieldValue('email'))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Invalid Email!');
                                },
                            }),
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
    }
};

export default Recover;