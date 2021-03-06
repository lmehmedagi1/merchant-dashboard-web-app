import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { message, Input, Calendar, List, Spin, Card  } from 'antd';
import { MailOutlined, MailTwoTone, HourglassTwoTone, EnvironmentTwoTone, PhoneTwoTone} from '@ant-design/icons';
import { getUser, getToken } from '../auth';
import { getNotifications } from './notifications.js';
import '../App.css';
import './main-page.css';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

const { TextArea } = Input; 
const onChange = e => {};
const AuthStr = 'Bearer ' + (getToken());

let cardTitle        = "";
let glavnaPoslovnica = {};
let svePoslovnice    = [];
let username         = "";

if (getUser() != null && getUser().name != null && getUser().surname != null) {
    username = getUser().name + " " + getUser().surname;
    cardTitle = username + "'s main bussiness";
}

class Home extends React.Component {

    state = {
        data: [],
        loading: false,
        hasMore: true,
        notifications: []
    };

    constructor(props) {
        super(props);
        this.getOffices();
        this.getMainOffice();
    }

    componentDidMount() {
        this.getOffices();
        this.getMainOffice();

        setInterval(() => { 
            let noveNotifikacije = getNotifications();
            for (let i=0; i<noveNotifikacije.length; i++) {
                let action = noveNotifikacije[i].payload.action;
                if (action.includes("ire"))
                    noveNotifikacije[i].location = '/employees';
                else if (action.includes("_office"))
                    noveNotifikacije[i].location = '/shops';
                else 
                    noveNotifikacije[i].location = '/products';
            }
            this.setState({notifications: noveNotifikacije}); 
        }, 1000);
    }
 
    
    getOffices() {
        axios.get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
        .then(response => {
            svePoslovnice = response.data;
        })
        .catch(err => console.log(err));
    };

    getMainOffice() {
    let URL = `https://main-server-si.herokuapp.com/api/business/mainOffice`;
    axios.get(URL, { headers: { 'Authorization': AuthStr } })
    .then((response) => {
        if (response.data.length === 0) return;
        for (let i = 0; i < svePoslovnice.length; i++) {
            if (svePoslovnice[i].id === response.data.mainOfficeId) {
                glavnaPoslovnica.location    = svePoslovnice[i].address + ", " + svePoslovnice[i].city + ", " + svePoslovnice[i].country;
                glavnaPoslovnica.email       = svePoslovnice[i].email;
                glavnaPoslovnica.phoneNumber = svePoslovnice[i].phoneNumber;
                glavnaPoslovnica.workHours   = svePoslovnice[i].workDayStart + " - " + svePoslovnice[i].workDayEnd;
                break;
            }
        }
    }).catch(error => {
        if (window.location.href === '\app')
             message.error("Something went wrong!");
        console.log(error);
    });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
          loading: true,
        });
        this.getMainOffice();
        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
    };

 
    render() {
    return (
        <div id = "mainPageContent">
        <div id="welcomeiBusiness">
            <div id="welcomeText">
                <h1>Welcome to your Merchant Dashboard, {username}!</h1>
            </div>
            <div id="mainBusiness">
                <Card title={cardTitle} style={{ width: 415 }} hoverable={true}>
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
                dataSource={this.state.notifications}
                renderItem={item => (
                <List.Item>
                    <Link to={item.location}>
                    <div style={{"cursor": "pointer", "width": "100%"}} >
                    <MailOutlined id = "ikonaNotifikacije"/>
                    <List.Item.Meta
                        title={item.type}
                        description={item.payload.description}
                    />
                    </div>
                    </Link>
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
 
export default Home;