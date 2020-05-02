import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import {Popconfirm, message, Input, Calendar, List, Menu, Dropdown, Button, Spin, Card  } from 'antd';
import { QuestionCircleOutlined, MailOutlined, EllipsisOutlined, MailTwoTone, HourglassTwoTone, EnvironmentTwoTone, PhoneTwoTone} from '@ant-design/icons';
import { getUser, getToken } from '../auth';
import '../App.css';
import './main-page.css';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';

const { TextArea } = Input; 
const onChange = e => {};
const AuthStr = 'Bearer ' + (getToken());
let URL = 'https://main-server-si.herokuapp.com/api/notifications/unread';
let clickedNotificationID = "";
let cardTitle = "";
let glavnaPoslovnica = {};
let svePoslovnice = [];
let options = {};

let ids = [];
let username = "";
if (getUser() != null && getUser().name != null && getUser().surname != null) {
    username = getUser().name + " " + getUser().surname;
    cardTitle = username + "'s main bussiness";
}
 

  
  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  
class Home extends React.Component {
    potvrda = async () => {
        ids = [];
        for (let i = 0; i < this.state.data.length; i++) {
            ids.push(this.state.data[i].id);
        }
        for (let i = 0; i < ids.length; i++) {
            clickedNotificationID = ids[i];
            let gotovo = await axios
            .delete(`https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}`,{ headers: { 'Authorization': AuthStr }}, {});
            this.showMessages();
        }
            message.success("Deleted all notifications!");
      }
      cancel = async () => {}

    state = {
        data: [],
        loading: false,
        hasMore: true,
    };
 
    constructor() {
        super();
        this.showMessages();
        this.getOffices();
        this.getMainOffice();
    }

    componentDidMount() {
        this.getOffices();
        this.getMainOffice();
      }
 
    menu = (
        <Menu onClick={(e) => {this.markMessage(e)}}>
            <Menu.Item key="2">
            <div id="porukaDelete"> Delete </div>
            </Menu.Item>
        </Menu>
    );
    
    getOffices() {
        axios.get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
        .then(response => {
            svePoslovnice = response.data;
        })
        .catch(err => console.log(err));
    };

    getMainOffice() {
    let URL = `https://main-server-si.herokuapp.com/api/business/${1}/mainOffice`;
    axios.get(URL, { headers: { 'Authorization': AuthStr } })
    .then((response) => {
        if (response.data.length === 0) return;
        console.log(response.data);
        for (let i = 0; i < svePoslovnice.length; i++) {
            if (svePoslovnice[i].id == response.data.mainOfficeId) {
                glavnaPoslovnica.location = svePoslovnice[i].address + ", " + svePoslovnice[i].city + ", " + svePoslovnice[i].country;
                glavnaPoslovnica.email = svePoslovnice[i].email;
                glavnaPoslovnica.phoneNumber = svePoslovnice[i].phoneNumber;
                glavnaPoslovnica.workHours = svePoslovnice[i].workDayStart + " - " + svePoslovnice[i].workDayEnd;
                break;
            }
        }
        console.log(glavnaPoslovnica);
    }).catch(error => {
        if (window.location.href == '\app')
             message.error("Something went wrong!");
        console.log(error);
    });
    };

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
                <Menu.Item key="2">
                <div id="porukaDelete">
                Delete
                </div>
                </Menu.Item>
            </Menu>
        );
    }
 
    markMessage = (menuKey) => {
        let notificationURL = `https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}`;
        if (menuKey.key == "2") {
            axios
            .delete(notificationURL, { headers: { 'Authorization': AuthStr } }, {})
            .then((response) => {
                if (response.data.length == 0) {
                    message.error("Something went wrong!");
                    return;
                }
                else 
                    this.showMessages();

            }).catch(error => {
                message.error("Something went wrong!");
            });
        }
 
        
    }
 
    render() {
       
    return (
        <div id = "mainPageContent">
        <div id="welcomeiBusiness">
            <div id="welcomeText">
                <h1>Welcome to your Merchant Dashboard, {username}!</h1>
            </div>
            <div id="mainBusiness">
                <Card title={cardTitle} style={{ width: 400 }} hoverable={true}>
                    <p><EnvironmentTwoTone /> Location: {glavnaPoslovnica.location}</p>
                    <p><HourglassTwoTone /> Working hours: {glavnaPoslovnica.workHours}</p>
                    <p> <MailTwoTone /> E-mail: {glavnaPoslovnica.email}</p>
                    <p><PhoneTwoTone /> Phone number: {glavnaPoslovnica.phoneNumber}</p>
                </Card>
           </div>
        </div>
        <div id="notifikacijeIKalendar">
            <div id="notifikacijeMain">
            <div id="naslovNotifikacijeMain">
                <h2>Notifications </h2>
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
            <Popconfirm
                title="Are you sure you want to delete all notifications?" icon={<QuestionCircleOutlined style={{ color: 'red' }}/>}
                onConfirm={this.potvrda}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
            >
                <a href="#">Delete all</a>
            </Popconfirm>
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