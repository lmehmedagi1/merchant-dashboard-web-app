import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, } from 'antd';
import '../App.css';
import { Avatar } from 'antd';
import { ShopOutlined, HomeOutlined, TeamOutlined ,AreaChartOutlined, DesktopOutlined, ReadOutlined, QuestionCircleFilled, SettingFilled, CloseCircleFilled, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import auth from "../auth";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;

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
              <span className="nav-text">Početna</span>
            </Menu.Item>
            <SubMenu className = "subMenuItem" key='2'
              title={
                <span>
                  <ShopOutlined />
                  <span>Poslovnice</span>
                </span>
              }
            >
              <Menu.Item key="pos1" className = "subMenuItem"> <HomeOutlined/> Tuzla</Menu.Item>
              <Menu.Item key="pos2" className = "subMenuItem"> <HomeOutlined/> Kakanj</Menu.Item>
              <Menu.Item key="pos3" className = "subMenuItem"> <HomeOutlined/> Travnik</Menu.Item>

            </SubMenu>
            <SubMenu 
              key="3" className = "subMenuItem"
              title={
                <span>
                  <TeamOutlined />
                  <span>Uposlenici</span>
                </span>
              }
            >
              <Menu.Item key="upos1" className = "subMenuItem"> <UserOutlined />Arslan</Menu.Item>
              <Menu.Item key="upos2" className = "subMenuItem"> <UserOutlined />Lejla</Menu.Item>
              <Menu.Item key="upos3" className = "subMenuItem"> <UserOutlined />Jasmin</Menu.Item>

            </SubMenu>  
            <Menu.Item key="4" className = "subMenuItem">
              <AreaChartOutlined />
              <span className="nav-text">Statistike</span>
            </Menu.Item>




            <Menu.Item  style={{ position: 'absolute', bottom: '40px' }} key="5" className = "subMenuItem">
              <QuestionCircleFilled />
              <span className="nav-text">Pomoc</span>
            </Menu.Item>
            <Menu.Item style={{ position: 'absolute', bottom: '0' }} key="6" className = "subMenuItem">
              <ReadOutlined />
              <span className="nav-text">O nama</span>
            </Menu.Item>

          </Menu>

         {/*
          <Menu style={{ position: 'absolute', bottom: '0' }} theme="dark" mode="inline">
            <Menu.Item key="5" className = "subMenuItem">
              <QuestionCircleFilled />
              <span className="nav-text">Pomoc</span>
            </Menu.Item>
            <Menu.Item key="6" className = "subMenuItem">
              <ReadOutlined />
              <span className="nav-text">O nama</span>
            </Menu.Item>
         </Menu> */}
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0, background: 'white' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              content
        </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Lima SI 2020</Footer>
        </Layout>
      </Layout>
);
};

export default Proba;