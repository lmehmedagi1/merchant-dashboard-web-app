import React from 'react';
import '../App.css';
import {  message, List } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { getToken } from '../auth';
import axios from 'axios';

const URL = 'https://main-server-si.herokuapp.com/api/notifications/unread';
  
class Notifications extends React.Component {
    state = {
      data: [],
      loading: false,
      hasMore: true,
    };

    componentDidMount() {
      this.fetchData(res => {
        this.setState({
          data: res,
        });
      });
    }

    fetchData = callback => {
      const AuthStr = 'Bearer ' + (getToken());
      axios
        .get(URL, { headers: { 'Authorization': AuthStr } }).then((response) => {
          console.log(response.data);
          if (response.data.length === 0) {
            message.info("There are no notifications!")
            return;
          }
          callback(response.data);
        }).catch(error => {
          message.error("Something went wrong!");
          console.log(error);
        });
    };

    ispisiPoruku = (hired, name, surname) => {
      if (hired)
        return name + " " + surname + " was hired."
      return name + " " + surname + " was fired."
    }

    render() {
    return (
        <div>
            <div id="naslovNotifikacije">
                <h1>Notifications</h1>
            </div>
            <div>
            <List id="listaNotifikacija"
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                <List.Item>
                    <MailOutlined id = "ikonaNotifikacije"/>
                    <List.Item.Meta
                        title={item.date}
                        description={this.ispisiPoruku(item.hired, item.employee.name, item.employee.surname)}
                    />
                </List.Item>
                )}
            />
            </div>
        </div>
    );
  }
};
        
export default Notifications;