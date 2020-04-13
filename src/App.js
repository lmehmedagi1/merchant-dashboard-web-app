import React from 'react';
import ReactDOM from "react-dom";
import './App.css';

import { ProtectedRoute } from "./protected.route";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Login from './components/login/login'
import Home from './components/home';
import Workshop from './components/workshop';
import Employees from './components/employees';
import Statistics from './components/statistics';
import About from './components/about';
import Help from './components/help';
import Recover from './components/login/recover';
import NotFound from './components/not-found';
import AddNewWorkshop from './components/add-new-workshop';
import Profile from './components/profile';
import ShopProduct from './components/products';

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import { Layout, Menu } from 'antd';
import './components/main-page.css';
import { Avatar } from 'antd';
import { CopyrightOutlined, DashboardFilled, ShopOutlined, ShoppingCartOutlined, TeamOutlined, AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import auth from "./auth";
import { getUser } from "./auth";

const { SubMenu } = Menu;
const { Footer, Content, Sider } = Layout;

let userName = "";
if (getUser() != null && getUser().name != null)
  userName = getUser().name + " " + getUser().surname;

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
                    {userName}
                  </span>
                } >

                <Menu.ItemGroup key='Username' style={{ textAlign: 'left' }}>
                  <Menu.Item key='accSettings'>
                    <Link to='./profile'>
                      <SettingFilled />
                      <span className="nav-text">Profile</span>
                    </Link>

                  </Menu.Item>
                  <Menu.Item key='LogOut' onClick={() => {
                    auth.logout(() => {
                      window.location.href = '/'
                    });
                  }}>
                    <CloseCircleFilled />
        Log Out</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item className="subMenuItem" key="1">
                <Link to='./app'>
                  <DesktopOutlined />
                  <span className="nav-text">Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item className="subMenuItem" key="2">
                <Link to='/shops'>
                  <ShopOutlined />
                  <span className="nav-text">Shops</span>
                </Link>
              </Menu.Item>
              <Menu.Item className="subMenuItem" key="3">
                <Link to='/employees'>
                  <TeamOutlined />
                  <span className="nav-text">Employees</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4" className="subMenuItem">
                <Link to='./statistics'>
                  <AreaChartOutlined />
                  <span className="nav-text">Statistics</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" className="subMenuItem">
                <Link to='./products'>
                  <ShoppingCartOutlined />
                  <span className="nav-text">Products</span>
                </Link>
              </Menu.Item>
              <Menu.Item style={{ position: 'absolute', bottom: '40px' }} key="6" className="subMenuItem">
                <Link to="./help">
                  <QuestionCircleFilled />
                  <span className="nav-text">Help</span>
                </Link>
              </Menu.Item>
              <Menu.Item style={{ position: 'absolute', bottom: '0' }} key="7" className="subMenuItem">
                <Link to='./about'>
                  <ReadOutlined />
                  <span className="nav-text">About us</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>


          <Layout>
            <div id="NaslovApp">
              <div><DashboardFilled /> Merchant Dashboard</div>
            </div>
            <Content id="bodyMain">

              <Switch>
                <Route exact path="/" component={Login} />
                <ProtectedRoute exact path="/app" component={Home} />
                <ProtectedRoute exact path="/employees" component={Employees} />
                <ProtectedRoute exact path="/shops" component={Workshop} />
                <ProtectedRoute exact path="/statistics" component={Statistics} />
                <ProtectedRoute exact path="/help" component={Help} />
                <ProtectedRoute exact path="/about" component={About} />
                <ProtectedRoute exact path="/addShop" component={AddNewWorkshop} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/products" component={ShopProduct} />

                <Route exact path="/recover-password" component={Recover} />
                <Route exact path="/recover-password/:email" component={Recover} />
                <Route path="*" component={NotFound} />
              </Switch>
            
            </Content>
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