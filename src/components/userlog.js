import React from 'react';
import { Table, Input, Button, Menu, Dropdown, Form} from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getToken } from '../auth';
import '../App.css';
import '../components/employees.css';


class UserLog extends React.Component {
    constructor() {
        super();
        this.state = {
            initialLogs: [],
            logs: [],
            filteredInfo: null,
            sortedInfo: null,
            searchText: '',
            searchedColumn: '',
            selectedMonth: 'Select month'
        }
    }

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    UNSAFE_componentWillMount() {
        this.getLogs();
    }

    timeConverter(timestamp) {
        let a = new Date(timestamp);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate();
        let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
        let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        let time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
        return time;
    }

    getLogs() {
        axios.get('https://main-server-si.herokuapp.com/admin/logs', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {
                let logs = response.data.logs;
                logs.map(log => {
                    log.timestamp = this.timeConverter(log.timestamp);
                    log.name = log.action.name;
                    log.description = log.action.description;
                    log.object = log.action.object;
                    delete log.action;
                    return log;
                });
                this.setState({ initialLogs: logs, logs: logs }, () => {})})
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
1
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            searchText: '',
            selectedMonth: 'Select month',
            logs: this.state.initialLogs
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
        }
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

    getFiltered = () => {
        let filtered = [];
        for (var key in this.state.filteredInfo) {
            if (this.state.filteredInfo.hasOwnProperty(key) && this.state.filteredInfo[key] != null) {
                filtered.push({
                    key: key,
                    value: this.state.filteredInfo[key][0].toString().toLowerCase()
                });
            }
        }

        let newLog = this.state.logs.filter((log) => {
            for (let element of filtered) {
                if (!log[element.key].toString().toLowerCase().includes(element.value)) {
                    return false;
                }
            }
            return true;
        });

        if (this.state.sortedInfo !== null) {
            if (this.state.sortedInfo.order) {
                key = this.state.sortedInfo.columnKey
                let order = this.state.sortedInfo.order === "ascend" ? 1 : -1;
                newLog.sort((log1, log2) => {
                    if (key === "timestamp")
                        return this.customCompareDates(log1[key], log2[key]);
                    return log1[key].localeCompare(log2[key]) * order;
                });
            }
        }
        return newLog;
    }

    customCompareDates = (a, b) => {
        let dateA = a.replace(":", ".").replace(" ", ".").split(".");
        let dateB = b.replace(":", ".").replace(" ", ".").split(".");
        dateA = (new Date(parseInt(dateA[2]), parseInt(dateA[1]), parseInt(dateA[0]), parseInt(dateA[3]), parseInt(dateA[4]))).getTime();
        dateB = (new Date(parseInt(dateB[2]), parseInt(dateB[1]), parseInt(dateB[0]), parseInt(dateB[3]), parseInt(dateB[4]))).getTime();
        if (dateA > dateB)
            return 1;
        if (dateA < dateB)
            return -1;
        return 0;
    }

    handleMenuClick = (e) => {
        if (this.state.selectedMonth === 'Select month')
            this.setState({ initialLogs: this.state.logs });
        this.setState({ selectedMonth: this.months[e.key] });
        this.setState({ logs: this.state.initialLogs.filter((log) => parseInt(log.timestamp.split(".")[1]) === parseInt(e.key) + 1) })
    }

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="0">
                {this.months[0]}
            </Menu.Item>
            <Menu.Item key="1">
                {this.months[1]}
            </Menu.Item>
            <Menu.Item key="2">
                {this.months[2]}
            </Menu.Item>
            <Menu.Item key="3">
                {this.months[3]}
            </Menu.Item>
            <Menu.Item key="4">
                {this.months[4]}
            </Menu.Item>
            <Menu.Item key="5">
                {this.months[5]}
            </Menu.Item>
            <Menu.Item key="6">
                {this.months[6]}
            </Menu.Item>
            <Menu.Item key="7">
                {this.months[7]}
            </Menu.Item>
            <Menu.Item key="8">
                {this.months[8]}
            </Menu.Item>
            <Menu.Item key="9">
                {this.months[9]}
            </Menu.Item>
            <Menu.Item key="10">
                {this.months[10]}
            </Menu.Item>
            <Menu.Item key="11">
                {this.months[11]}
            </Menu.Item>
        </Menu>
    );

    render() {
        let sortedInfo = this.state.sortedInfo;
        let filteredInfo = this.state.filteredInfo;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Date',
                dataIndex: 'timestamp',
                key: 'timestamp',
                filteredValue: filteredInfo.timestamp || null,
                sorter: (a, b) => { return this.customCompareDates(a.timestamp, b.timestamp) },
                sortOrder: sortedInfo.columnKey === 'timestamp' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('timestamp'),
                width: 140,
                fixed: 'center',
            },
            {
                title: 'Description',
                key: 'description',
                dataIndex: 'description',
                filteredValue: filteredInfo.description || null,
                sorter: (a, b) => { return a.description.localeCompare(b.description) },
                sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('description'),
                width: 550,
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                filteredValue: filteredInfo.username || null,
                sorter: (a, b) => { return a.username.localeCompare(b.username) },
                sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('username'),
                width:200,
            },
            {
                title: 'Action',
                dataIndex: 'name',
                key: 'name',
                filteredValue: filteredInfo.name || null,
                sorter: (a, b) => { return a.name.localeCompare(b.name) },
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Object',
                key: 'object',
                dataIndex: 'object',
                filteredValue: filteredInfo.object || null,
                sorter: (a, b) => { return a.object.localeCompare(b.object) },
                sortOrder: sortedInfo.columnKey === 'object' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('object'),
                width: 140,
            },
        ];
        return (
            <div>
                <div id = "TabelaNaslov"><h1 > User log </h1> </div>
                    <Form layout = "inline" className = "components-table-demo-control-bar">
                    </Form>
                    <div className="table-operations">
                        <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                        <Dropdown overlay={this.menu}>
                            <Button style={{margin: '20px', position: 'relative', zIndex: '99' }}>
                                {this.state.selectedMonth} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div> 
                <Table id ="tabelaUposlenika" 
                    columns={columns} 
                    dataSource={this.state.logs} 
                    onChange={this.handleChange} 
                />
            </div>
        );
    }
}

export default UserLog;