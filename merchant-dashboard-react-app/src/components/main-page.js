import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import '../components/main-page.css';
import '../App.css';
import { Divider, Input, Calendar, Avatar } from 'antd';
import { CopyrightOutlined, DashboardFilled, ShopOutlined, BellOutlined, TeamOutlined ,AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import auth from "../auth";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;
const { TextArea } = Input;
const onChange = e => {
  console.log(e);
};

const Proba = (props) => {

return (
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
              <Content>
                <div  id = "kalendar" >
                  <Calendar fullscreen={false}/>
                </div>
                <div id = "Notes" >
                    <TextArea placeholder=" Write down the thoughts of the moment. Those that come unsought for are commonly the most valuable." allowClear onChange={onChange} />
                </div>
              </Content>
          </Content>
          <Footer id = "footer"> <CopyrightOutlined/> Lima SI 2020</Footer>
        </Layout>
      </Layout>
);
};

export default Proba;