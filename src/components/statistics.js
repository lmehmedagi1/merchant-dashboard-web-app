import React from 'react';
import { Line, Pie, HorizontalBar } from 'react-chartjs-2';
import Axios from 'axios';
import { getToken } from '../auth.js';
import '../App.css';
import './statistics.css';
import {DatePicker,Select, List, message, Tabs} from 'antd';


const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const dateFormat = "DD.MM.YYYY";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

let startDate, endDate = "";
let nizDatumaLabel = [];
let nazivPoslovnice = "";
let currentTab = "cashRegisters";

function onBlur() {}
 
function onFocus() {}
 
function onSearch(val) {}

function rasponDatuma(pocetni, krajnji) {
  const start = moment(pocetni);
  const end = moment(krajnji);
  const range = moment.range(start, end);
  const nizDatuma = Array.from(range.by('days'));
  let result = []
  for (let i = 0; i < nizDatuma.length; i++) {
    let dan = nizDatuma[i]._d.getDate();
    if (dan < 10)
      dan = '0'+dan;
    let mjesec = nizDatuma[i]._d.getMonth()+1;
    if (mjesec < 10)
      mjesec = '0'+mjesec;
    let godina = nizDatuma[i]._d.getFullYear();
    result.push(dan+"."+mjesec+"."+godina);
  }
  startDate = result[0];
  endDate = result[result.length-1];
  return result;
}

function disabledDate(current) {
  return current > moment().endOf('day');
}
 
class Statistics extends React.Component{

  onFinish = values => {
    this.onChange(values)
  };

  state = {
      poslovnice: [],
      employees: [],
      receipts: [],
      cashRegisters: [],
      cashRegistersChartData: [],
      employeesChartData: [],
      productsChartData: [],
  };

  componentDidMount() {
    nizDatumaLabel = [];
    this.fetchShops(res => {
      this.setState({
        poslovnice: res,
      });
    });
  };  

  onChangeDate = values =>{
    if (!values) {
      nizDatumaLabel = [];
      return;
    }
    nizDatumaLabel = rasponDatuma(values[0]._d,values[1]._d);
    this.onChange(nazivPoslovnice);
  }

  round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  onChange = id => {
    nazivPoslovnice = id;

    if (nazivPoslovnice === '') {
      message.warning('No shop has been selected!');
      return;
    }
    if (nizDatumaLabel.length === 0) {
      message.warning('No date has been selected!');
      return;
    }

    this.setState({receipts: [], uposlenici: [], cashRegisters: [], cashRegistersChartData: [], employeesChartData: [], productsChartData: []});
    Axios
        .post(`https://main-server-si.herokuapp.com/api/receipts/filtered`, 
              { from: startDate, to: endDate,},
              { headers: { Authorization: 'Bearer ' + getToken()}}
        )
        .then((allReceipts) => {
        Axios
        .get(`https://main-server-si.herokuapp.com/api/business/offices/${id}/cashRegisters`, { headers: { Authorization: 'Bearer ' + getToken() } })
        .then(allCashRegisters => {
          Axios
          .get(`https://main-server-si.herokuapp.com/api/offices/${id}/employees`, { headers: { Authorization: 'Bearer ' + getToken() } })
          .then(allEmployees => {
            this.setState({receipts: allReceipts, cashRegisters: allCashRegisters, employees: allEmployees}, () => { 
              this.newTabSelected(currentTab); 
          });
            
          })
          .catch(err => console.log(err));
        })
      })
    .catch(error => {message.error('No date selected!');});    
  }

  fetchShops = callback => {
      Axios
      .get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
          callback(response.data);
      })
      .catch(err => console.log(err));
  };
  
  productsTabSelected = () => {

    let trenutniRacuni = this.state.receipts.data;
    let trenutneKase   = this.state.cashRegisters.data;
    if (trenutneKase.length === 0) {
      message.error("There are no sold products in this shop!");
      return;
    }
    let chartData  = [];
    let labels     = []; 
    let dataValues = [];
    let datasets   = [];
    let idKasa     = [];
    let i = 0;
    
    //            orange     blue       red        green      purple     yellow     dark green black
    let colors = ['#DAA520', '#7CB9E8', '#FF0800', '#00FF40', '#8806CE', '#FFD300', '#3B7A57', '#000000'];
    let backgroundColors = []; 

    let productsMap = new Map();

    let options = {
        title:  { display: true, text: "Products" },
        legend: { display: false }  
    };

    for (let j = 0; j < trenutneKase.length; j++) 
      idKasa.push(trenutneKase[j].id);

    for (let j = 0; j < trenutniRacuni.length; j++) {
        if (idKasa.includes(trenutniRacuni[j].cashRegisterId)  && trenutniRacuni[j].officeId === nazivPoslovnice) {

          let receiptItems = trenutniRacuni[j].receiptItems;

          for (let k = 0; k < receiptItems.length; k++) {
            if (!productsMap.has(receiptItems[k].productName)) {
              productsMap.set(receiptItems[k].productName, 0);
            }

            let oldAmount = productsMap.get(receiptItems[k].productName);
            let newAmount = receiptItems[k].price*receiptItems[k].quantity*(100-receiptItems[k].discountPercentage)*(100+receiptItems[k].pdv)/10000;
            
            productsMap.set(receiptItems[k].productName, this.round(oldAmount+newAmount, 2));
          } 
        }
    }

    let sortedMap = new Map([...productsMap].sort((a, b) => {
        return a[1] < b[1];
    }));

    for (const [key, value] of sortedMap.entries()) {
        labels.push(key);
        dataValues.push(value);
        backgroundColors.push(colors[i%8]);
        i++;
    }

    datasets.push({ data: dataValues, backgroundColor: backgroundColors, hoverBackgroundColor: backgroundColors});
    chartData.push({id: nazivPoslovnice, chart: {labels: labels, datasets: datasets}, options: options});


    this.setState({productsChartData: chartData});
  }

  employeesTabSelected = () => {

    let trenutniUposlenici = this.state.employees.data;
    let trenutniRacuni = this.state.receipts.data;
    let trenutneKase = this.state.cashRegisters.data;
    if (trenutniUposlenici.length === 0) {
      message.error("There are no employees in this shop!");
      return;
    }
    let chartData = [];
    let labels    = []; 
    
    //            orange     blue       red        green      purple     yellow     dark green black
    let colors = ['#DAA520', '#7CB9E8', '#FF0800', '#00FF40', '#8806CE', '#FFD300', '#3B7A57', '#000000'];
    let backgroundColors = []; 

    for (let i = 0; i < trenutniUposlenici.length; i++) {
      labels.push(trenutniUposlenici[i].name + " " + trenutniUposlenici[i].surname);
      backgroundColors.push(colors[i%8]);
    }

    for (let i = 0; i < trenutneKase.length; i++) {
      let options = {
        title:  { display: true, text: trenutneKase[i].name },
        legend: { display: true, position: 'right' }
      };

      let employeesMap = new Map();

      for (let i = 0; i < trenutniUposlenici.length; i++) {
        employeesMap.set(trenutniUposlenici[i].username,0);
      }

      let datasets  = [];
      for (let j = 0; j < trenutniRacuni.length; j++) {
        if (trenutniRacuni[j].cashRegisterId === trenutneKase[i].id && trenutniRacuni[j].officeId === nazivPoslovnice) {
          let oldAmount = employeesMap.get(trenutniRacuni[j].username);
          let newAmount = trenutniRacuni[j].totalPrice; 
          employeesMap.set(trenutniRacuni[j].username, this.round(oldAmount+newAmount, 2));
        }
      }

      let dataValues = [];
      for (let i = 0; i < trenutniUposlenici.length; i++) {
        dataValues.push(employeesMap.get(trenutniUposlenici[i].username));
      }
      datasets.push({ data: dataValues, backgroundColor: backgroundColors, hoverBackgroundColor: backgroundColors});
      chartData.push({id: trenutneKase[i].id, chart: {labels: labels, datasets: datasets}, options: options});
    }

    this.setState({employeesChartData: chartData});
  }

  cashRegistersTabSelected = () => {

    let trenutneKase = this.state.cashRegisters.data;
    let trenutniRacuni = this.state.receipts;

    let newDataArray = [];
    this.setState({ cashRegistersChartData: newDataArray });
    let filtriraniRacuni = trenutniRacuni.data;

    let labeleKasa      = [];
    let vrijednostiKasa = [];
    if (trenutneKase.length === 0) {
      message.error("There are no cash registers in this shop!");
      return;
    }
    for (let k=0; k<trenutneKase.length; k++) {
      labeleKasa.push(trenutneKase[k].name);

      let mapaNovca = new Map();
      
      let iznos = 0;
      for (let datum in nizDatumaLabel) 
        mapaNovca.set(nizDatumaLabel[datum],iznos);

      for (let i = 0; i < filtriraniRacuni.length; i++) {
        if (filtriraniRacuni[i].cashRegisterId === trenutneKase[k].id  && filtriraniRacuni[i].officeId === nazivPoslovnice) {
          let date = moment(filtriraniRacuni[i].timestamp).format("DD.MM.YYYY");
          let oldInfo = mapaNovca.get(date);
          let noviIznos = oldInfo+filtriraniRacuni[i].totalPrice;
          noviIznos = this.round(noviIznos,2);
          mapaNovca.set(date,noviIznos);
        }
      }

      let vrijednosti = []
      for (let i = 0; i < nizDatumaLabel.length; i++) 
        vrijednosti.push(mapaNovca.get(nizDatumaLabel[i]));

      vrijednostiKasa.push(vrijednosti);
    } 
    
    
      let datasetsKasa = [];
      let boje = ['#DAA520', 'rgba(255, 0, 0, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(0, 0, 255, 0.3)'];
    
      for (let i = 0; i < trenutneKase.length; i++) {
        let newDataset = {
          label: labeleKasa[i],
              fill: false,
              lineTension: 0.8,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: boje[i%4], 
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
              data: vrijednostiKasa[i]
        }
        datasetsKasa.push(newDataset);
      }
      let newData = {
        id: trenutneKase[0].id,
        cashRegisterName: trenutneKase[0].name,
        barData: {
          labels: nizDatumaLabel,
          datasets: datasetsKasa
          
        },
        barOptions: {
          title: {
            display: true,
            text: "Cash registers"
          },
          legend: {
            display: true
          }
        }
      }
      newDataArray.push(newData);
      this.setState({cashRegistersChartData: newDataArray});
  }



  newTabSelected = key => {
    currentTab = key;

    if (this.state.receipts.length === 0 || this.state.cashRegisters.length === 0 || this.state.employees.length === 0) {
      return;
    }

    if (currentTab === "cashRegisters") 
      this.cashRegistersTabSelected();
    else if (currentTab === "employees") 
      this.employeesTabSelected();
    else if (currentTab === "products") 
      this.productsTabSelected();
  }

  render() {
    return (
      <div>
        <div id="naslovStatistics">
        <h1>Statistics</h1>
        <div>
          <RangePicker
            id="rangePickerStatistics" 
            onChange = {this.onChangeDate}
            name={['datum','range']} 
            disabledDate={disabledDate} 
            format = {dateFormat}>
          </RangePicker>
        </div>
        <br/>
        <div id = "selectShopStatistics">
        <Select
          showSearch
          style={{ width: '20%' }}
          placeholder=" Select a shop "
          optionFilterProp="children"
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
          }
        >
          {this.state.poslovnice.map(poslovnica => (
              <Option key={poslovnica.id} value={poslovnica.id}>{poslovnica.address}, {poslovnica.city}</Option>))}
        </Select>
        </div>
        </div>
        <div id="statistikaTabovi">
        <div className="card-container">
          <Tabs type="card" onChange={this.newTabSelected}>
            <TabPane tab="Cash registers" key="cashRegisters">
              <div id = "chartListContainerStatistics">
                  <List
                    dataSource={this.state.cashRegistersChartData}
                    renderItem={item => (
                    <List.Item key={item.id}>
                        <div id = "lineChartStatistics">
                            <Line redraw={true} data={item.barData} options={item.barOptions}/>
                        </div>
                    </List.Item>
                    )}
                    />
                </div>
              
            </TabPane>
            <TabPane tab="Employees" key="employees">
              <div id = "chartListContainerStatistics">
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={this.state.employeesChartData}
                  renderItem={item => (
                  <List.Item key={item.id}>
                      <div id = "pieChartStatistics">
                        <Pie data={item.chart} options={item.options} />
                      </div>
                  </List.Item>
                  )}
                  />
              </div>
            </TabPane>
            <TabPane tab="Products" key="products">
            <div id = "chartListContainerStatistics">
                <List
                  dataSource={this.state.productsChartData}
                  renderItem={item => (
                  <List.Item key={item.id}>
                      <div id = "pieChartStatistics">
                        <HorizontalBar data={item.chart} options={item.options} />
                      </div>
                  </List.Item>
                  )}
                  />
              </div>
            </TabPane>
          </Tabs>
        </div>
        </div>
      </div>
    );
  }
}
 
export default Statistics;