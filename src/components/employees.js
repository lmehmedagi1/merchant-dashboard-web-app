import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { getToken } from '../auth';
import Axios from 'axios';
import './employees.css';
import { Table, Form, Input, Button } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const data = [];
const URL = 'https://main-server-si.herokuapp.com/api/employees';

class Employees extends React.Component {

    state = {
        bordered: true,
        size: 'default',
        scroll: undefined,
        hasData: true,
        data: [],
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        searchText: '',
        searchedColumn: '',
    };

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res,
            });
            for (let i = 0; i < res.length; i++) 
                data[i].roles = res[i].roles.rolenamee;
            });
    }


    fetchData = callback => {
        const AuthStr = 'Bearer ' + (getToken());
        Axios
            .get(URL, { headers: { 'Authorization': AuthStr } }).then((response) => {
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

    handleChange = (pagination, filters, sorter) => {
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
        console.log("lol", this.state);
      };
    
      clearFilters = () => {
        this.setState({ filteredInfo: null });
      };
    
      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
          searchText: ''
        });
      };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
              </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
              </Button>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
    
    
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        console.log(this.state);
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };




    render() {

        let filteredInfo = this.state.filteredInfo;
        let sortedInfo = this.state.sortedInfo;
        filteredInfo = filteredInfo || {};
        sortedInfo = sortedInfo || {};


        const columns = [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                filteredValue: filteredInfo.name || null,
                ellipsis: true,
                ...this.getColumnSearchProps('name'),
                render: text => <a className = "contentOfTable" > { text } </a>,
            },
            {
                title: 'Surname',
                dataIndex: 'surname',
                key: 'surname',
                width: 150,
                filteredValue: filteredInfo.surname || null,
                ellipsis: true,
                ...this.getColumnSearchProps('surname'),
                render: text => <a className = "contentOfTable" > { text } </a>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: 250,
                filteredValue: filteredInfo.email || null,
                ellipsis: true,
                ...this.getColumnSearchProps('email'),
                render: text => <a className = "contentOfTable" > { text } </a>,
            },
            {
                title: 'Phone number',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 200,
                filteredValue: filteredInfo.phoneNumber || null,
                ellipsis: true,
                ...this.getColumnSearchProps('phoneNumber'),
                render: text => <a className = "contentOfTable" > { text } </a>,
            },
            {
                title: 'Role',
                dataIndex: "roles",
                key: 'roles',
                filters: [
                    {
                      text: 'ADMIN',
                      value: 'ADMIN',
                    },
                    {
                      text: 'MANAGER',
                      value: 'MANAGER',
                    },
                    {
                      text: 'MERCHANT',
                      value: 'MERCHANT',
                    },
                    {
                      text: 'WAREMAN',
                      value: 'WAREMAN',
                    },
                    {
                      text: 'PRW',
                      value: 'PRW',
                    },
                    {
                      text: 'CASHIER',
                      value: 'CASHIER',
                    },
                    {
                      text: 'OFFICEMAN',
                      value: 'OFFICEMAN',
                    },
                    {
                      text: 'BARTENDER',
                      value: 'BARTENDER',
                    },
                ],
                filteredValue: filteredInfo.roles || null,
                onFilter: (value, record) => {
                    for (let i = 0; i<record.roles.length; i++) {
                        if (record.roles[i].rolename.indexOf(value) !== -1) return true;
                    }
                    return false;
                },
                render: data => { 
                    let allRoles = "";
                    let i = 0;
                    for (i = 0; i<data.length; i++) {
                      switch (data[i].rolename) {
                        case 'ROLE_MERCHANT':
                          data[i].rolename = 'Merchant';
                          break;
                        case 'ROLE_ADMIN':
                          data[i].rolename = 'Administrator';
                          break;
                        case 'ROLE_MANAGER':
                          data[i].rolename = 'Manager';
                          break;
                        case 'ROLE_WAREMAN':
                          data[i].rolename = 'Warehouse manager';
                          break;
                        case 'ROLE_PRP':
                          data[i].rolename = 'Public Relations with Privileges';
                          break;
                        case 'ROLE_PRW':
                          data[i].rolename = 'Public Relations worker';
                          break;
                        case 'ROLE_CASHIER':
                          data[i].rolename = 'Cashier';
                          break;
                        case 'ROLE_OFFICEMAN':
                          data[i].rolename = 'Office manager';
                          break;
                        case 'ROLE_BARTENDER':
                          data[i].rolename = 'Bartender';
                          break;
                        default: 
                          break;
                      }
                      allRoles += data[i].rolename;
                      if (i != data.length-1) allRoles += ", ";
                    }
                    return <a className = "contentOfTable" > {allRoles} </a>
            } 
            },
        ];

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

        return (
        <div>
            <Form layout = "inline"
            className = "components-table-demo-control-bar"
            style = {
                { marginBottom: 16 }
            } >
            </Form>

            

            <div id = "TabelaNaslov"><h1 > List of employees </h1> </div>
            <div className="table-operations"><Button onClick={this.clearAll}>Clear filters and sorters</Button></div> 

            <Table {...this.state }
            columns = { tableColumns }
            dataSource = { this.state.data}
            scroll = { scroll }
            onChange={this.handleChange}
            /> 
            
        </div >


        );
    }
};
const rootElement = document.getElementById("root");

ReactDOM.render( <Employees/> , rootElement);

export default Employees;