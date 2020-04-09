import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import { getToken } from '../auth';
import Axios from 'axios';

class ShopProduct extends React.Component {
  state = {
    value: undefined,
    treeData: [],
  };

  componentWillMount() {
    this.fetchShops(async res => {
        this.setState({treeData: []});
        let noviNiz = [];
        for(let i = 0; i < res.length; i++) {
            let objekat = {};
            objekat.title = res[i].address + ' ' + res[i].city;
            objekat.value = 'p ' + res[i].id;
            let kase = await Axios
            .get(`https://main-server-si.herokuapp.com/api/business/offices/${res[i].id}/cashRegisters`, { headers: { Authorization: 'Bearer ' + getToken() } });
            let children = [];
            for(let j = 0; j < kase.data.length; j++) {
                children.push({title : kase.data[j].name, value: kase.data[j].id});
            }
            objekat.children = children;
            noviNiz.push(objekat);
        }
        this.setState({treeData: noviNiz});
    });
  }

  fetchShops = callback => {
    Axios
    .get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
    .then(response => {
        callback(response.data);
    })
    .catch(err => console.log(err));
};

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={this.state.treeData}
        placeholder="Please select shop or cash register to display data"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<ShopProduct />, rootElement);

export default ShopProduct;