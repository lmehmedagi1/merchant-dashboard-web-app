import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';

import { ProtectedRoute } from "./protected.route";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";


import Login from './components/login/login'
import Home from './components/home';
import Workshop from './components/workshop';
import Employees from './components/employees';
import Notifications from './components/notifications';
import Statistics from './components/statistics';
import About from './components/about';
import Help from './components/help';
import NotFound from './components/not-found';


import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import './components/main-page.css';
import './App.css';
import { Divider, Input, Calendar, Avatar } from 'antd';
import { CopyrightOutlined, DashboardFilled, ShopOutlined, BellOutlined, TeamOutlined ,AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import auth from "./auth";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;
const { TextArea } = Input;

const onChange = e => {
  console.log(e);
};


function App(props) {
  return (
      <div className="App">

<Layout style={{ height: '100vh' }}>

<Sider style={{ paddingTop: '15px' }}
  breakpoint="lg"
  collapsedWidth="0"
  onBreakpoint={broken => {
    console.log(broken);
  }}
  onCollapse={(collapsed, type) => {
    console.log(collapsed, type);
  }}
>
  <div id='siderGlavni'>
    <Avatar size="large" style={{ paddingBottom: '10px' }} icon={<UserOutlined />} />
  </div>
  <div className="logo" />
  <Menu theme="dark" mode="inline">
    <SubMenu style={{ textAlign: 'center' }}
      title={
        <span >
          Arslan Turkusic
        </span>
      } >

      <Menu.ItemGroup key='Username' style={{ textAlign: 'left' }}>
        <Menu.Item key='accSettings'>
        <SettingFilled />
          Account Settings</Menu.Item>
        <Menu.Item key='LogOut' onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
          }}>
          <CloseCircleFilled />
        Log Out</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <Menu.Item className = "subMenuItem" key="1">
      <DesktopOutlined />
      <span className="nav-text">Dashboard</span>
    </Menu.Item>
    <Menu.Item className = "subMenuItem" key="2">
      <ShopOutlined />
      <span className="nav-text">Workshop</span>
    </Menu.Item>
    <Menu.Item className = "subMenuItem" key="3">
      <TeamOutlined />
      <span className="nav-text">Employees</span>
    </Menu.Item>  
    <Menu.Item key="4" className = "subMenuItem">
      <AreaChartOutlined />
      <span className="nav-text">Statistics</span>
    </Menu.Item>
    <Menu.Item key="5" className = "subMenuItem">
      <BellOutlined/>
      <span className="nav-text">Notifications</span>
    </Menu.Item>
    <Menu.Item  style={{ position: 'absolute', bottom: '40px' }} key="6" className = "subMenuItem">
      <QuestionCircleFilled />
      <span className="nav-text">Help</span>
    </Menu.Item>
    <Menu.Item style={{ position: 'absolute', bottom: '0' }} key="7" className = "subMenuItem">
      <ReadOutlined />
      <span className="nav-text">About us</span>
    </Menu.Item>
  </Menu>
</Sider>


<Layout>
    <div id="NaslovApp"> 
      <div><DashboardFilled/> Merchant Dashboard</div>
    </div>
    <Content id = "bodyMain">

          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path="/app" component={Home} />
              <Route exact path="/employees" component={Employees} />
              <Route exact path="/workshop" component={Workshop} />
              <Route exact path="/statistics" component={Statistics} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/about" component={About} />
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>

    </Content>
    <Footer id = "footer"> <CopyrightOutlined/> Lima SI 2020</Footer>
</Layout>
</Layout>
</div>
    );
  }


const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);


export default App;