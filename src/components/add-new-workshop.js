import React from 'react';
import { Input, Form, Button, message, TimePicker } from 'antd';
import axios from 'axios';
import '../App.css';
import { getToken } from '../auth';
import moment from 'moment';

const format = 'HH:mm';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };


const AddNewWorkshop = () => {

    const onFinish = values => {
        const AuthStr = 'Bearer ' + (getToken());
        axios
        .post('https://main-server-si.herokuapp.com/api/notifications/office/open', {
            address: values.user.address,
            city: values.user.city,
            country: values.user.country,
            email: values.user.email,
            phoneNumber: values.user.phone_number
        }, { headers: { 'Authorization': AuthStr } }).then((response) => {
            if (response.data.length === 0) {
                message.error("Something went wrong!");
                return;
            }
            window.location.href = '/shops';
        }).catch(error => {
            message.error("Something went wrong!");
        });
    }

        return (
            <div id="formaDodaj" >
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'address']} label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'city']} label="City" rules={[{  required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'country']} label="Country" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email"  rules={[{ type: 'email', required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone_number']} label="Phone number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'workDayStart']} label="Open hour" rules={[{ required: true }]}>
                        <TimePicker defaultValue={moment('00:00', format)} format={format} />
                    </Form.Item>
                    <Form.Item name={['user', 'workDayEnd']} label="Close hour" rules={[{ required: true }]}>
                        <TimePicker defaultValue={moment('23:59', format)} format={format} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Send request
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };

    export default AddNewWorkshop;
