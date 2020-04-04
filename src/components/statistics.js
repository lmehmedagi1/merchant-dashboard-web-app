import React from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import { getToken } from '../auth.js';
import '../App.css';
import { Select, List} from 'antd';

 
function onBlur() {}
 
function onFocus() {}
 
function onSearch(val) {}
 
const { Option } = Select;
 
class Statistics extends React.Component{
  state = {
      poslovnice: [],
      chartData: [],
      brojUposlenika: null,
  };

  componentDidMount() {
    this.fetchShops(res => {
      this.setState({
        poslovnice: res,
      });
    });
  };  


  onChange = id => {

    let newDataArray = [];
    this.setState({
      chartData: newDataArray,
    });
    Axios
      .get(`https://main-server-si.herokuapp.com/api/business/offices/${id}/cashRegisters`, { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {

          for (let i = 0; i < response.data.length; i++) {
            let novacKase  = [];
            novacKase.push(response.data[i].dailyProfit);
            novacKase.push(response.data[i].totalProfit);

            let newData = {
              id: response.data[i].id,
              cashRegisterName: response.data[i].name,
              barData: {
                labels: ['Daily profit', 'Total profit'],
                datasets: [
                  {
                    backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.6)'],
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: novacKase
                  }
                ]
              },
              barOptions: {
                title: {
                  display: true,
                  text: response.data[i].name
                },
                legend: {
                  display: false
                }
              }
            }
            newDataArray.push(newData);
          }
          Axios
          .get(`https://main-server-si.herokuapp.com/api/offices/${id}/employees`, { headers: { Authorization: 'Bearer ' + getToken() } })
          .then(response => {
            this.setState({
              chartData: newDataArray,
              brojUposlenika: response.data.length,
          });
          document.getElementById('numberEmployees').innerHTML = "Number of employees: " + this.state.brojUposlenika;
          })  
          .catch(err => console.log(err));
          
          
      })  
      .catch(err => console.log(err));  
  }   



  fetchShops = callback => {
      Axios
      .get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
          callback(response.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div id="naslovNotifikacije">
        <h1>Statistics</h1>
        <div id = "selectAdresa">
        <Select
          showSearch
          style={{ width: 250 }}
          placeholder="Select a shop"
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
        <div id = "dijagrami">
        <h3 id = "numberEmployees">
          
        </h3>
        <List
                grid={{  column: 2 }}
                dataSource={this.state.chartData}
                renderItem={item => (
                <List.Item key={item.id}>
                    <div style={{ width: "100%" }}>
                        <Bar redraw={true} data={item.barData} options={item.barOptions}/>
                    </div>
                </List.Item>
                )}
          />
        </div>
      </div>
    );
  }
}
 
export default Statistics;