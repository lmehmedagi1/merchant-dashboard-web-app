import React from 'react';
import { Table, Input, Button, message, ReactDOM, Alert} from 'antd';
import { DeleteOutlined, SearchOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { getToken } from '../auth.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

let IDZaBrisanje = -1;
let IDMainOffice = -1;

const options = {
  title: 'Confirmation',
  message: 'Do you really want to delete this workshop?',
  buttons: [
    {
      label: 'Yes',
      onClick: () => {
        Axios
          .post('https://main-server-si.herokuapp.com/api/notifications/office/close',
          {
            officeId: IDZaBrisanje
          }, { headers: { Authorization: 'Bearer ' + getToken()}}).then((response) => {
            if (response.data.statusCode !== 200) {
              message.error("Something went wrong!");
              return;
            }
            message.success("Your request was successfully sent")
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

const optionsMainOffice = {
  title: 'Confirmation',
  message: 'Do you really want this office to be the main one?',
  buttons: [
    {
      label: 'Yes',
      onClick: () => {
        Axios
          .put('https://main-server-si.herokuapp.com/api/business/mainOffice',
          {
            mainOfficeId: IDMainOffice
          }, { headers: { Authorization: 'Bearer ' + getToken()}}).then((response) => {
            if (response.data.statusCode !== 200) {
              message.error("Something went wrong!");
              return;
            }
            message.success("Your request was successfully sent")
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

const alreadyMO = {
  title: 'Alert',
  message: 'This is already the main office!',
  buttons: [
    {
      label: 'OK',
      onClick: () => {

      }
    }
  ]
};

const getCashRegisterData = (id) => {
  Axios
    .get('https://main-server-si.herokuapp.com/api/business/offices/' + id + '/cashRegisters',
      { headers: { Authorization: 'Bearer ' + getToken() } }).then(response => {
        
        let totalDaily = 0;
        let totalTotal = 0;

        let kase = "<h3 > Cash registers </h3><div>";
        for (let i = 0; i < response.data.length; i++) {
          kase += "<hr></hr><p > Cash register name : " + response.data[i].name + " </p>";
          kase += "<p > Daily traffic : " + response.data[i].dailyProfit + " KM </p>";
          kase += "<p > Total traffic : " + response.data[i].totalProfit + " KM </p>";

          totalDaily += response.data[i].dailyProfit;
          totalTotal +=  response.data[i].totalProfit;
        }

        kase += "<hr></hr><p> Total daily traffic : " + totalDaily.toFixed(2) + " KM </p>";
        kase += "<p> Total traffic : " + totalTotal.toFixed(2) + " KM </p>";
        kase += "</div>";
        if (response.data.length == 0)
          document.getElementById(id).innerHTML ="No data";
        else
          document.getElementById(id).innerHTML = kase;
      })
    .catch(err => console.log(err));
}

const expandable = {
  expandedRowRender: record => {
    getCashRegisterData(record.id);
    return <div id={record.id}> No data </div>;
  }

};

class Workshop extends React.Component {

  constructor() {
    super();
    this.state = {
      workshops: [],
      filteredInfo: null,
      expandable,
      sortedInfo: null,
      empl: [],
      searchText: '',
      searchedColumn: '',
    }
  }
  componentWillMount() {
    this.getWorkshops();
    this.getMainOffice();
  }

  getWorkshops() {
    Axios.get('https://main-server-si.herokuapp.com/api/business/offices',
      { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i]["key"] = i;
        }
        this.setState({ workshop: response.data }, () => {
        })
      })
      .catch(err => console.log(err));
  }

  getMainOffice() {
    IDMainOffice = Axios.get('https://main-server-si.herokuapp.com/api/business/mainOffice',
      { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
        IDMainOffice = response.mainOfficeId;
      })
      .catch(err => console.log(err));
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
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
    IDZaBrisanje = oficeID;
    confirmAlert(options);
  }

  setMainOffice(oficeID) {
    if (IDMainOffice == oficeID) {
      confirmAlert(alreadyMO);
    }
    else {
      IDMainOffice = oficeID;
      confirmAlert(optionsMainOffice);
    }
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
        sorter: (a, b) => {
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
        sortOrder: sortedInfo.columnKey === 'workDayEnd' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('workDayEnd'),
      },
      {
        title: 'Delete office',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) =>
          2 >= 1 ? (
            <Button onClick={() => { this.deleteAction(record.id); }} style={{ margin: '10px' }} type="primary" icon={<DeleteOutlined />} size={'default'} />
          ) : null,
      },
      {
        title: 'Set main office',
        dataIndex: 'makemainoffice',
        key: 'makemainoffice',
        render: (text, record) =>
          2 >= 1 ? (
            <Button id = "button" onClick={() => { this.setMainOffice(record.id); }} style={{ margin: '10px' }} type="primary" icon={<CheckSquareOutlined />} size={'default'} />
          ) : null,
      }
    ];
    return (
      <div>
        <div id = "TabelaNaslov"><h1 > List of shops </h1> </div>

        <div className="table-operations">
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>

        </div>

        <div>
          <Table id = "tabelaPoslovnica" columns={columns} expandable={expandable} dataSource={this.state.workshop} onChange={this.handleChange} />
        </div></div>
    );

  }
}


export default Workshop;