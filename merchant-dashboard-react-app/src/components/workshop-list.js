import { List, message, Avatar, Spin, Button } from 'antd';
import './workshop.css';
import React from 'react';
import ReactDOM from "react-dom";
import { HomeOutlined, DeleteOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { getToken } from '../auth';
import Axios from 'axios';
import './workshop.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const URL = 'https://main-server-si.herokuapp.com/api/business/offices';

let IDZaBrisanje = -1;

const options = {
  title: 'Confirmation',
  message: 'Do you really want to delete this workshop?',
  buttons: [
    {
      label: 'Yes',
      onClick: () => {
        console.log(IDZaBrisanje);
        Axios
          .post('https://main-server-si.herokuapp.com/api/notifications/office/close', {
            officeId:IDZaBrisanje
          }).then((response) => {
            if (response.data.statusCode !== 200) {
              message.error("Something went wrong!");
              return;
            }
          }).catch(error => {
            message.error('error');
          });
      }
    },
    {
      label: 'No',
      onClick: () => {

      }
    }
  ]
};

class InfiniteListExample extends React.Component {
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
    Axios
      .get(URL, { headers: { 'Authorization': AuthStr } }).then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          return;
        }
        callback(response.data);
      }).catch(error => {
        console.log(error);
      });
  };

  deleteAction(oficeID) {
    console.log(oficeID);
    IDZaBrisanje = oficeID;
    confirmAlert(options);
  }

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar size="large" icon={<HomeOutlined />} />
                  }
                  title={<div className='menadzerPodaciLista' style={{ float: 'left' }}><div>{item.manager.name + ' ' + item.manager.surname}</div>
                    <div>{item.manager.phoneNumber + ', ' + item.manager.email}</div></div>}
                  description={item.phoneNumber + ', ' + item.email}
                />
                <div> 
                  <div>{item.address + ', ' + item.city + ', ' + item.country}</div>
                  <div> Radno vrijeme: 06-20h </div>  
                </div>
                <Button onClick={() => { this.deleteAction(item.id); }} style={{ margin: '10px' }} type="primary" icon={<DeleteOutlined />} size={'default'} />
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<InfiniteListExample />, rootElement);

export default InfiniteListExample;