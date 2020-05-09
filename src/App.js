import React from 'react';
import ReactDOM from 'react-dom';
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
import UserLog from './components/userlog';

import Notifications from './components/notifications';

import { Layout, Menu, Avatar } from 'antd';
import './components/main-page.css';
import { SolutionOutlined, DashboardFilled, ShopOutlined, ShoppingCartOutlined, TeamOutlined, AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined } from '@ant-design/icons';
import auth from "./auth";
import { getUser } from "./auth";

const checkChangedTabs = () => {
  let href = window.location.href.split('/');
  href = href[href.length - 1];
  return href;
}

const { SubMenu } = Menu;
const {Content, Sider } = Layout;
let userName = "";
if (getUser() != null && getUser().name != null) userName = getUser().name + " " + getUser().surname;

class App extends React.Component {

  state = {
    currentLocation: ''
  } 

  clickedMenu = () => {
    this.setState({ currentLocation: checkChangedTabs() });
  }


  componentDidMount() {
    this.setState({ currentLocation: checkChangedTabs() });

    setInterval(() => { 
      this.setState({ currentLocation: checkChangedTabs() });
    }, 500);
  }

  render() {

  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ height: '100vh' }}>

          <Sider style={{ paddingTop: '15px' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div id='siderGlavni'>
              <Avatar size="large" style={{ paddingBottom: '10px' }} icon={<UserOutlined />} />
            </div>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['/' + this.state.currentLocation]} selectedKeys={['/' + this.state.currentLocation]} onClick={() => { this.clickedMenu(); }}>
              <SubMenu style={{ textAlign: 'center' }}
                title={
                  <span id="imeKorisnika">
                    {userName}
                  </span>
                } >

                <Menu.ItemGroup key='Username' style={{ textAlign: 'left' }}>
                  <Menu.Item key='/profile'>
                    <Link to='./profile'>
                      <SettingFilled />
                      <span className="nav-text">Profile</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='/userlog'>
                    <Link to='./userlog'>
                      <SolutionOutlined />
                      <span className="nav-text">User log</span>
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
              <Menu.Item className="subMenuItem" key="/app">
                <Link to='./app'>
                  <DesktopOutlined />
                  <span className="nav-text">Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item className="subMenuItem" key="/shops">
                <Link to='/shops'>
                  <ShopOutlined />
                  <span className="nav-text">Shops</span>
                </Link>
              </Menu.Item>
              <Menu.Item className="subMenuItem" key="/employees">
                <Link to='/employees'>
                  <TeamOutlined />
                  <span className="nav-text">Employees</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/statistics" className="subMenuItem">
                <Link to='./statistics'>
                  <AreaChartOutlined />
                  <span className="nav-text">Statistics</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/products" className="subMenuItem">
                <Link to='./products'>
                  <ShoppingCartOutlined />
                  <span className="nav-text">Products</span>
                </Link>
              </Menu.Item>
              <Menu.Item style={{ position: 'absolute', bottom: '40px' }} key="/help" className="subMenuItem">
                <Link to="./help">
                  <QuestionCircleFilled />
                  <span className="nav-text">Help</span>
                </Link>
              </Menu.Item>
              <Menu.Item style={{ position: 'absolute', bottom: '0' }} key="/about" className="subMenuItem">
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
            <div id="notificationBell"> 
            <div className='artboard'>
              <Notifications/>
            </div>
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
                <ProtectedRoute exact path="/userlog" component={UserLog} />
                <Route exact path="/recover-password" component={Recover} />
                <Route exact path="/recover-password/:email" component={Recover} />
                <Route path="*" component={NotFound} />
              </Switch>
            
            </Content>
          </Layout>
        </Layout>

      </div>
    </BrowserRouter>
  );}
}





const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);


export default App;