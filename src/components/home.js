import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Input, Calendar, message, List, Radio, Menu, Dropdown, Button, Spin  } from 'antd';
import { MailOutlined, EllipsisOutlined, ShopOutlined} from '@ant-design/icons';
import { getUser, getToken } from '../auth';
import '../App.css';
import './main-page.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const { TextArea } = Input;
 
const onChange = e => {};
const AuthStr = 'Bearer ' + (getToken());
let URL = 'https://main-server-si.herokuapp.com/api/notifications/unread';
let mode = "unread";
let otherMode = "read";
let clickedNotificationID = "";
 
let ids = [];
let username = "";
if (getUser() != null && getUser().name != null && getUser().surname != null) {
    username = getUser().name + " " + getUser().surname;
}
 
const options = {
    title: 'Confirmation',
    message: 'Do you really want to delete all notifications?',
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
 
          for (let i = 0; i < ids.length; i++) {
                clickedNotificationID = ids[i];
                let gotovo = await axios
                .post(`https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}/delete`, {},  { headers: { 'Authorization': AuthStr } });
                Home.showMessages();
            }
        }
      },
      {
        label: 'No',
        onClick: () => {
 
        }
      }
    ]
  };
 
class Home extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };
 
    constructor() {
        super();
        this.showMessages();
    }
 
    menu = (
        <Menu onClick={(e) => {this.markMessage(e)}}>
            <Menu.Item key="1">
            <div id="porukaMark">
            Mark as {otherMode}
            </div>
            </Menu.Item>
            <Menu.Item key="2">
            <div id="porukaDelete">
            Delete
            </div>
            </Menu.Item>
        </Menu>
    );
 
    componentDidMount() {
        this.showMessages();
    }
 
    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
          loading: true,
        });
        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.showMessages();
      };
 
 
    ispisiPoruku = (hired, name, surname, time) => {
        if (hired)
          return name + " " + surname + " was hired at " + time + ".";
        return name + " " + surname + " was fired at " + time + ".";
    }
 
    showMessages = () => {
        axios
        .get(URL, { headers: { 'Authorization': AuthStr } })
        .then((response) => {
            if (response.data.length === 0) {
                message.info("There are no notifications!");
            }
            let nizDatuma = response.data;
            nizDatuma.sort(function(a, b){
                a = a.date.split('.');
                b = b.date.split('.');
                return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
            });
            this.setState({
                data: response.data,
                loading: false
            });
        }).catch(error => {
            if (window.location.href == '\app')
                 message.error("Something went wrong!");
            console.log(error);
        });
    };
 
    buttonClick = id => {
        clickedNotificationID = id;
        this.menu = (
            <Menu onClick={(e) => {this.markMessage(e)}}>
                <Menu.Item key="1">
                <div id="porukaMark">
                Mark as {otherMode}
                </div>
                </Menu.Item>
                <Menu.Item key="2">
                <div id="porukaDelete">
                Delete
                </div>
                </Menu.Item>
            </Menu>
        );
    }
 
    markMessage = (menuKey) => {
        let notificationURL = `https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}/markRead`;
 
        if (menuKey.key == "1") {
            axios
            .post(notificationURL, {},  { headers: { 'Authorization': AuthStr } })
            .then((response) => {
                if (!response.data.id) {
                    message.error("Something went wrong!");
                    return;
                }
                this.showMessages();
            }).catch(error => {
                message.error("Something went wrong!");
            });
        }
        else if (menuKey.key == "2") {
            notificationURL = `https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}`;
            axios
            .delete(notificationURL, { headers: { 'Authorization': AuthStr } }, {})
            .then((response) => {
                if (response.data.length == 0) {
                    message.error("Something went wrong!");
                    return;
                }
                this.showMessages();
            }).catch(error => {
                message.error("Something went wrong!");
            });
        }
 
        
    }
 
    switchedNotifications = e => {
        otherMode = mode;
        mode = e.target.value;
        URL = "https://main-server-si.herokuapp.com/api/notifications/" + mode;
        this.showMessages();
    }
 
 
    markAll = async () => {
        let ids = [];
        let i = 0;
        for (i = 0; i < this.state.data.length; i++) {
            ids.push(this.state.data[i].id);
        }
 
        for (i = 0; i < ids.length; i++) {
            clickedNotificationID = ids[i];
            let gotovo = await axios
            .post(`https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}/markRead`, {},  { headers: { 'Authorization': AuthStr } });
            this.showMessages();
        }
    }
 
    deleteAll = async () => {
        ids = [];
        for (let i = 0; i < this.state.data.length; i++) {
            ids.push(this.state.data[i].id);
        }
 
        confirmAlert(options);
    }
 
    render() {
       
    return (
        <div id = "mainPageContent">
        <div id="welcomeText">
            <h1>Welcome, {username}</h1>
        </div>
        <div id="notifikacijeIKalendar">
           
            <div id="notifikacijeMain">
            <div id="naslovNotifikacijeMain">
                <h2>Notifications </h2>
                <Radio.Group onChange={this.switchedNotifications} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="read">Read</Radio.Button>
                    <Radio.Button value="unread">Unread</Radio.Button>
                </Radio.Group>
            </div>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
            >
            <List id="listaNotifikacija"
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                <List.Item key={item.id}>
                    <MailOutlined id = "ikonaNotifikacije"/>
                    <List.Item.Meta
                        title={item.date}
                        description={this.ispisiPoruku(item.hired, item.employee.name, item.employee.surname, item.time)}
                    />
                    <div  id="components-dropdown-dmo-dropdown-button">
                    <Dropdown overlay={this.menu} placement="bottomRight" onClick={() => {this.buttonClick(item.id)}} trigger='click'>
                        <Button><EllipsisOutlined /></Button>
                    </Dropdown>
                       
                    </div>
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
            <hr/>
            <Button type="link" onClick={this.markAll}> Mark all as {otherMode} </Button>
            <Button type="link" onClick={this.deleteAll}> Delete all </Button>
            </div>
            <div id="kalendarMain">
            <Calendar fullscreen={false}/>
            </div>
 
        </div>
 
        <div id="notes">
            <TextArea placeholder=" Write down the thoughts of the moment. Those that come unsought for are commonly the most valuable." allowClear onChange={onChange} />
        </div>
        </div>
    );
    }
};
 
const rootElement = document.getElementById("root");
ReactDOM.render( <Home/> , rootElement);
 
       
export default Home;