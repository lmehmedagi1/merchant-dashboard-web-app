import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Input, Calendar, message, List, Radio, Menu, Dropdown, Button, Spin  } from 'antd';
import { MailOutlined} from '@ant-design/icons';
import { getUser, getToken } from '../auth';
import '../App.css';
import './main-page.css';
import axios from 'axios';
const { TextArea } = Input;

const onChange = e => {};
const AuthStr = 'Bearer ' + (getToken());
let URL = 'https://main-server-si.herokuapp.com/api/notifications/unread';
let mode = "unread";
let otherMode = "read";
let clickedNotificationID = "";



class Home extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    menu = (
        <Menu onClick={this.markMessage}>
            <Menu.Item key="1">
            <div id="porukaMark">
            Mark as read
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
            this.setState({
                data: response.data,
                loading: false
            });
        }).catch(error => {
            message.error("Something went wrong!");
            console.log(error);
        });
    };

    buttonClick = id => {
        clickedNotificationID = id;
        this.menu = (
            <Menu onClick={this.markMessage}>
                <Menu.Item key="1">
                <div id="porukaMark">
                Mark as {otherMode}
                </div>
                </Menu.Item>
            </Menu>
        );
    }

    markMessage = () => {
        axios
        .post(`https://main-server-si.herokuapp.com/api/notifications/${clickedNotificationID}/markRead`, {},  { headers: { 'Authorization': AuthStr } })
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

    render() {
        
    return (
        <div id = "mainPageContent">
        <div id="welcomeText">
            <h1>Welcome, {getUser().name} {getUser().surname}</h1>
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
                    <div id="components-dropdown-demo-dropdown-button">
                        <Dropdown.Button onClick={this.buttonClick(item.id)} overlay={this.menu} trigger={['click']}/>
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
