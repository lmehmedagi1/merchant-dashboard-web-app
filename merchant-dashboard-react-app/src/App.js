import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';

import { ProtectedRoute } from "./protected.route";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Login from './components/login/login'
import Home from './components/home';
import Workshop from './components/workshop';
import Employees from './components/employees';
import Notifications from './components/notifications';
import Statistics from './components/statistics';
import About from './components/about';
import Help from './components/help';
import Recover from './components/login/recover';
import Change from './components/login/change';
import NotFound from './components/not-found';


import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import './components/main-page.css';
import './App.css';
import { Divider, Input, Calendar, Avatar } from 'antd';
import { CopyrightOutlined, DashboardFilled, ShopOutlined, BellOutlined, TeamOutlined ,AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import auth from "./auth";
import { getUser } from "./auth";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;
const { TextArea } = Input;

const onChange = e => {
  console.log(e);
};


function App(props) {
  return (
    <BrowserRouter>
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
        <span id="imeKorisnika">
        </span>
      } >

      <Menu.ItemGroup key='Username' style={{ textAlign: 'left' }}>
        <Menu.Item key='accSettings'>
        <SettingFilled />
          Account Settings</Menu.Item>
        <Menu.Item key='LogOut' onClick={() => {
          auth.logout(() => {
            window.location.href = '/'
          });
          }}>
          <CloseCircleFilled />
        Log Out</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <Menu.Item className = "subMenuItem" key="1">
      <Link to='./app'>
      <DesktopOutlined />
      <span className="nav-text">Dashboard</span>
      </Link>
    </Menu.Item>
    <Menu.Item className = "subMenuItem" key="2">
      <Link to='/workshop'>
      <ShopOutlined />
      <span className="nav-text">Workshop</span>
      </Link>
    </Menu.Item>
    <Menu.Item className = "subMenuItem" key="3">
      <Link to='/employees'>
      <TeamOutlined />
      <span className="nav-text">Employees</span>
      </Link>
    </Menu.Item>  
    <Menu.Item key="4" className = "subMenuItem">
      <Link to='./statistics'>
      <AreaChartOutlined />
      <span className="nav-text">Statistics</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="5" className = "subMenuItem">
      <Link to='./notifications'>
      <BellOutlined/>
      <span className="nav-text">Notifications</span>
      </Link>
    </Menu.Item>
    <Menu.Item  style={{ position: 'absolute', bottom: '40px' }} key="6" className = "subMenuItem">
      <Link to="./help">
      <QuestionCircleFilled />
      <span className="nav-text">Help</span>
      </Link>
    </Menu.Item>
    <Menu.Item style={{ position: 'absolute', bottom: '0' }} key="7" className = "subMenuItem">
      <Link to='./about'>
      <ReadOutlined />
      <span className="nav-text">About us</span>
      </Link>
    </Menu.Item>
  </Menu>
</Sider>


<Layout>
    <div id="NaslovApp"> 
      <div><DashboardFilled/> Merchant Dashboard</div>
    </div>
    <Content id = "bodyMain">

            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path="/app" component={Home} />
              <ProtectedRoute exact path="/employees" component={Employees} />
              <ProtectedRoute exact path="/workshop" component={Workshop} />
              <ProtectedRoute exact path="/statistics" component={Statistics} />
              <ProtectedRoute exact path="/notifications" component={Notifications} />
              <ProtectedRoute exact path="/help" component={Help} />
              <ProtectedRoute exact path="/about" component={About} />
              <Route exact path="/recover-password" component={Recover} />
              <Route exact path="/recover-password/:email" component={Recover} />
              <Route path="*" component={NotFound} />
            </Switch>

    </Content>
    <Footer id = "footer"> <CopyrightOutlined/> Lima SI 2020</Footer>
</Layout>
</Layout>
</div>
</BrowserRouter>
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