import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Table, Switch, Radio, Form, Input} from 'antd';
import { DownOutlined  } from '@ant-design/icons';
const { TextArea } = Input;

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

const title = () => 'List of the employees';
const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

class Employees extends React.Component {
    
    state = {
        bordered: true,
        size: 'default',
        scroll: undefined,
        hasData: true,
    };
      handleToggle = prop => enable => {
        this.setState({ [prop]: enable });
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
    
        const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
        if (xScroll === 'fixed') {
          tableColumns[0].fixed = true;
          tableColumns[tableColumns.length - 1].fixed = 'right';
        }

        return (
        <div>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="Size">
            <Radio.Group value={state.size} onChange={this.handleSizeChange}>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
          
        <div id = "TabelaNaslov">List of employees</div>
        <Table
          {...this.state}
          columns={tableColumns}
          dataSource={state.hasData ? data : null}
          scroll={scroll}
        />
        </div>

        
    );
}};
const rootElement = document.getElementById("root");

ReactDOM.render(<Employees />, rootElement);
export default Employees;