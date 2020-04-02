import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { getToken } from '../auth';
import Axios from 'axios';
import './employees.css';
import { Table, Switch, Radio, Form, Input,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const URL = 'https://main-server-si.herokuapp.com/api/employees';

const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a className = "contentOfTable" > { text } </a>,
    },
    {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'name',
        render: text => <a className = "contentOfTable" > { text } </a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'contact',
        render: text => <a className = "contentOfTable" > { text } </a>,
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'contact',
        render: text => <a className = "contentOfTable" > { text } </a>,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: text => <a className = "contentOfTable" > { text } </a>,
    },
];

const data = [];





class Employees extends React.Component {

    state = {
        bordered: true,
        size: 'default',
        scroll: undefined,
        hasData: true,
        data: [],
       searchText: '',
      searchedColumn: '',
    };

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res,
            });
        });
    }


    fetchData = callback => {
        const AuthStr = 'Bearer ' + (getToken());
        Axios
            .get(URL, { headers: { 'Authorization': AuthStr } }).then((response) => {
                console.log(response.data);
                if (response.data.length === 0) {
                    return;
                }
                callback(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    handleToggle = prop => enable => {
        this.setState({
            [prop]: enable
        });
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

   
       
   

    render() {
        const { xScroll, yScroll, ...state } = this.state;
        const scroll = {};
        if (yScroll) {
            scroll.y = 240;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }

    const tableColumns = columns.map(item => ({...item, ellipsis: state.ellipsis }));
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        }

        return (<div>
            <Form layout = "inline"
            className = "components-table-demo-control-bar"
            style = {
                { marginBottom: 16 }
            } >
            </Form>

            <div id = "TabelaNaslov" >
            <h1 > List of employees </h1> </div > <
            Table {...this.state }
            columns = { tableColumns }
            dataSource = { this.state.data }
            scroll = { scroll }
            /> </div >


        );
    }
};
const rootElement = document.getElementById("root");

ReactDOM.render( < Employees / > , rootElement);

export default Employees;