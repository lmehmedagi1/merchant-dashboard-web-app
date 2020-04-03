import React from 'react';
import {Table,Input, Button, message, Avatar, Spin } from 'antd';
import InfiniteListExample from './workshop-list.js';
import { HomeOutlined, DeleteOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { SearchOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { getToken } from '../auth.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
 
 
const { Search } = Input;
let IDZaBrisanje = -1;
 
const options = {
  title: 'Confirmation',
  message: 'Do you really want to delete this workshop?',
  buttons: [
    {
      label: 'Yes',
      onClick: () => {
        console.log(IDZaBrisanje);
        Axios
          .post('https://main-server-si.herokuapp.com/api/notifications/office/close', {
            officeId:IDZaBrisanje
          }).then((response) => {
            if (response.data.statusCode !== 200) {
              message.error("Something went wrong!");
              return;
            }
          }).catch(error => {
            message.error('error');
          });
      }
    },
    {
      label: 'No',
      onClick: () => {
 
      }
    }
  ]
};
 
class Workshop extends React.Component {
 
    constructor() {
      super();
      this.state = {
        workshops: [],
        filteredInfo: null,
        sortedInfo: null,
        empl: [],
        searchText: '',
        searchedColumn: '',
      }
    }
    componentWillMount() {
      this.getWorkshops();
    }
 
    getWorkshops() {
      Axios.get('https://main-server-si.herokuapp.com/api/business/offices',
       { headers: { Authorization: 'Bearer ' + getToken() } })
        .then(response => {
          this.setState({ workshop: response.data }, () => {
            console.log(response.data);
          })
        })
        .catch(err => console.log(err));
    }
 
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters,sorter);
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
 
    deleteAction(oficeID) {
      console.log(oficeID);
      IDZaBrisanje = oficeID;
      confirmAlert(options);
    }
 
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
      const columns = [
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          filteredValue: filteredInfo.address || null,
          sorter: (a, b) => { return a.address.localeCompare(b.address) },
          sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
          ellipsis: true,
          ...this.getColumnSearchProps('address'),
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          filteredValue: filteredInfo.city || null,
          sorter: (a, b) => { return a.city.localeCompare(b.city) },
          sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
          ellipsis: true,
          ...this.getColumnSearchProps('city'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          filteredValue: filteredInfo.email || null,
          sorter: (a, b) => { return a.email.localeCompare(b.email) },
          sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
          ellipsis: true,
          ...this.getColumnSearchProps('email'),
        },
        {
          title: 'Open hour',
          dataIndex: 'workDayStart',
          key: 'workDayStart',
          filteredValue: filteredInfo.workDayStart || null,
          sorter: (a, b) =>  {
            let x2 = parseInt(a.workDayStart.replace(':', ''));
            let y2 = parseInt(b.workDayStart.replace(':', ''));
            
            return x2 < y2
            },
          sortOrder: sortedInfo.columnKey === 'workDayStart' && sortedInfo.order,
          ellipsis: true,
          ...this.getColumnSearchProps('workDayStart'),
        },
        {
          title: 'Close hour',
          dataIndex: 'workDayEnd',
          key: 'workDayEnd',
          filteredValue: filteredInfo.workDayEnd || null,
          sorter: (a, b) => {
            let x2 = parseInt(a.workDayEnd.replace(':', ''));
            let y2 = parseInt(b.workDayEnd.replace(':', ''));
            
            return x2 < y2
            },
         sortOrder: sortedInfo.columnKey=== 'workDayEnd' && sortedInfo.order,
          ellipsis: true,
          ...this.getColumnSearchProps('workDayEnd'),
        },
        {
          title: 'DELETE',
          dataIndex: 'delete',
          render : (text, record) =>
          2>=1 ? (
            <Button onClick={() => { this.deleteAction(record.id); }} style={{ margin: '10px' }} type="primary" icon={<DeleteOutlined />} size={'default'} />            
          ) : null,
        }
      ];
      return (
        <div>
 
          <div className="table-operations">
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
           
          </div>
         
          <div>
 
          <Table columns={columns} dataSource={this.state.workshop} onChange={this.handleChange} />
          </div></div>
      );
 
    }
  }
 
 
 
export default Workshop;