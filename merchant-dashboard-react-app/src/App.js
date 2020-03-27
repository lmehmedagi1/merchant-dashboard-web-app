import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import Login from './components/login/login'
import Proba from './components/main-page';
import { ProtectedRoute } from "./protected.route";
import {WarningOutlined} from '@ant-design/icons';

import { BrowserRouter, Route, Switch } from "react-router-dom";



class App extends Component {
  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute exact path="/app" component={Proba} />
            <Route path="*" component={() => {
              return (<h2 style={{ color: 'white', paddingTop: '2em' }} ><WarningOutlined />   404 NOT FOUND</h2>)
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);

export default App;