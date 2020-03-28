import React from 'react';
import '../App.css';
import { Divider, Input, Calendar, Avatar, List } from 'antd';
import { MailOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};



const data = [
  {
    title: 'Poslovnica 1',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Ne znam ko bi mogao slat',
  },
  {
    title: 'Možda admin valjda',
  },
];
  
const Notifications = () => {
    return (
        <div>
            <div id="naslovNotifikacije">
                <h1>Notifications</h1>
            </div>
            <div>
            <List id="listaNotifikacija"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <MailOutlined id = "ikonaNotifikacije"/>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="A new employee was added to Workshop XXX by YYY"
                    />
                </List.Item>
                )}
            />
            </div>
        </div>
    );
};
        
export default Notifications;