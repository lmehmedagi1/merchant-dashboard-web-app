import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { TreeSelect, Card, List } from 'antd';
import { getToken } from '../auth';
import Axios from 'axios';
import { DollarOutlined, BarcodeOutlined, FieldNumberOutlined } from '@ant-design/icons';
import '../App.css';
import { relativeTimeRounding } from 'moment';



let mapaProizvoda = new Map();
let keyMapa = [];
let trenutnoOdabrano = '';

class ShopProduct extends React.Component {
  state = {
    value: undefined,
    treeData: [],
    products: [],
    allReceipts: [],
    prodaniProizvodi: new Map(),
    loading: false,
  };

  componentWillMount() {
    trenutnoOdabrano = '';
    this.fetchProducts();
    console.log(this.state.products);
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
    this.fetchReceipts();
  }

  fetchReceipts = async () => {
    this.setState({allReceipts: []});
    var datum = new Date();
    var dd = String(datum.getDate()).padStart(2, '0');
    var mm = String(datum.getMonth() + 1).padStart(2, '0'); 
    var yyyy = datum.getFullYear();
    datum = dd + "." + mm + "." + yyyy;
    let racuni =  await Axios.post(`https://main-server-si.herokuapp.com/api/receipts/filtered`, { from: "01.01.2000", to: datum},
    { headers: { Authorization: 'Bearer ' + getToken() } });
    this.setState({allReceipts: racuni.data});
  };

  fetchShops = callback => {
    Axios
    .get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
    .then(response => {
        callback(response.data);
    })
    .catch(err => console.log(err));
  };

  fetchProducts = async() => {
    let proizvodi = await Axios
    .get('https://main-server-si.herokuapp.com/api/products', { headers: { Authorization: 'Bearer ' + getToken() } });
    this.setState({products: proizvodi.data, loading: false});
    this.onChange(trenutnoOdabrano);
  };


  onChange = async value => {
    this.setState({loading: true});
    trenutnoOdabrano = value;
    if(trenutnoOdabrano == '') {
      this.setState({loading: false});
    }
    if(trenutnoOdabrano === '') {
      return;
    }
    mapaProizvoda = new Map();
    keyMapa = [];
    let idKasa = [];
    let x = value[0];
    if (x == "p") {
      let kase = await Axios
      .get(`https://main-server-si.herokuapp.com/api/business/offices/${value.slice(2)}/cashRegisters`, { headers: { Authorization: 'Bearer ' + getToken() } });
      for(let j = 0; j < kase.data.length; j++) 
        idKasa.push(kase.data[j].id);
    }
    else 
      idKasa.push(value);
    for (let i=0; i<this.state.allReceipts.length; i++) {
      if (idKasa.includes(this.state.allReceipts[i].cashRegisterId)) {
        let stavkeRacuna = this.state.allReceipts[i].receiptItems;
        for(let j=0; j < stavkeRacuna.length; j++) {
          let info = {};
          let cijenaProizvoda = (100 - stavkeRacuna[j].discountPercentage)/100 * stavkeRacuna[j].price;
          let brojProdanihProizvoda = stavkeRacuna[j].quantity;
          info = {price: cijenaProizvoda*brojProdanihProizvoda, quantity: brojProdanihProizvoda, unit: stavkeRacuna[j].unit, barcode: stavkeRacuna[j].barcode, slika: ""};
          if(!mapaProizvoda.has(stavkeRacuna[j].productName)) 
            mapaProizvoda.set(stavkeRacuna[j].productName, info);
          else {  
            let oldInfoProdukt = {};
            oldInfoProdukt = mapaProizvoda.get(stavkeRacuna[j].productName);
            let ukupnaProdajnaCijena = oldInfoProdukt.price + cijenaProizvoda*brojProdanihProizvoda;
            let ukupnoProdanihProizvoda = oldInfoProdukt.quantity + brojProdanihProizvoda;
            info = {price: ukupnaProdajnaCijena, quantity: ukupnoProdanihProizvoda, unit: stavkeRacuna[j].unit, barcode: stavkeRacuna[j].barcode, slika: ""};
            mapaProizvoda.set(stavkeRacuna[j].productName,info);
          }
        }
      }
    }
    keyMapa = Array.from(mapaProizvoda.keys());
    let sviProdani = [];
    for (let i = 0; i < keyMapa.length; i++) {
      let info = mapaProizvoda.get(keyMapa[i]);
      info.name = keyMapa[i];
      for (let j = 0; j < this.state.products.length; j++) {
        if (this.state.products[j].name == info.name) {
          info.slika = this.state.products[j].image;
          sviProdani.push(info);
          break;
        }
      }
    }
    this.setState({prodaniProizvodi: sviProdani, value: value});
    if(sviProdani.length !== 0) 
      this.setState({loading: false});
  };

  render() {
    return (
      <div>
      <TreeSelect
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={this.state.treeData}
        placeholder="Please select shop or cash register to display data"
        treeDefaultExpandAll
        onSelect={this.onChange}
      />
      <div id = "listaProizvoda">
        <List 
          loading={this.state.loading}
          grid={{  column: 3, gutter: 16}}
          dataSource={this.state.prodaniProizvodi}
          renderItem={item => (
          <List.Item>
              <div style={{ width: "100%" }}>
              <Card title={item.name} bordered={false}>
                <div id = "InfoProduktKartica">
                  <p><DollarOutlined /> Total traffic: {item.price.toFixed(2)} KM</p>
                  <p><FieldNumberOutlined /> Total {item.unit} sold: {item.quantity}</p>
                  <p><BarcodeOutlined /> Barcode: {item.barcode}</p>
                </div>
                <div id = "divSlike" >
                  <img id = "slikaPr" src = {item.slika}></img>
                </div>
              </Card>
              </div>
          </List.Item>
          )}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<ShopProduct />, rootElement);

export default ShopProduct;