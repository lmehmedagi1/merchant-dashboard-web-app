import React from 'react';
import { Input, Calendar } from 'antd';
// Ovdje se nalaze podaci o korisniku
import { getUser } from '../auth';
import '../App.css';
import './profile.css';
/*import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';*/



  /*user = {
        username: getUser.username,
        email:getUser.email,
        name: getUser.name,
        surname: getUser.surname,
        address: getUser.address,
        phoneNumber: getUser.phoneNumber,
        country: getUser.country,
        city: getUser.city,
    }*/

//let user = getUser();

  /*const FormLayoutDemo = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
  
    const onFormLayoutChange = ({ layout }) => {
      setFormLayout(layout);
    };
  
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : null;*/

const Profile = () => {
    return (
        
        <div id="naziv">
        <h1> User profile </h1>
        </div>
        
    /*<div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value={formLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ime">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Prezime ">
          <Input placeholder="input placeholder" />
        </Form.Item>
        
      </Form>
    </div>
    
  );

};
ReactDOM.render(<FormLayoutDemo />, mountNode);*/

       
    );
};
        
export default Profile;
