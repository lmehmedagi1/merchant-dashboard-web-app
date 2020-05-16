import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import { mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { act } from "react-dom/test-utils";

import App from './App';
import Login from './components/login/login';
import Workshop from './components/workshop';
import Employees from './components/employees';
import Statistics from './components/statistics';
import ShopProduct from './components/products';
import UserLog from './components/userlog';


configure({adapter: new Adapter()});

describe("Test", () => {

  // Ovo samo dodaj ne pitaj ništa
  beforeAll(() => {  
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("Login should be unsuccessful", () => {

    const wrapper = mount(<Router><Login /></Router> );

    let usernameInput =  wrapper.find("input").first().instance();
    let passwordInput =  wrapper.find("input").at(1).instance();

    usernameInput.value = "jasmin";
    passwordInput.value = "novaa";

    wrapper.find('button').simulate('click');

    expect(usernameInput).toBeVisible();
    wrapper.unmount();
  });


  test("Login should be successful", () => {

    act(() => {
      const wrapper = mount(<Router><Login /></Router>);
      let usernameInput = wrapper.find("input").first().instance();
      let passwordInput = wrapper.find("input").at(1).instance();
      usernameInput.value = "jasmin";
      passwordInput.value = "nova";
      wrapper.find('button').simulate('click');
      setTimeout(() => {
        expect(usernameInput).not.toBeVisible();
        wrapper.unmount();
      }, 1000);
    });
  });


  test("Search should be case-insensitive",  () => {
    const wrapper = mount(<Router><Workshop /></Router> );

    setTimeout(() => {
      let searchIcon = wrapper.find('span.ant-table-filter-trigger').at(0);
      searchIcon.simulate('click');

      let addressInput = wrapper.find("input").first().instance();;
      addressInput.value = "gavrila";

      wrapper.find('button').first().simulate('click');

      expect(wrapper.find('table').childAt(2).length).toEqual(1);
      wrapper.unmount();
    }, 1500);
  });


  test("Employees names should be sorted alphabetically", () => {

    const wrapper = mount(<Router><Employees /></Router> );

    setTimeout(() => {  

      let firstItem = wrapper.find('a').text();

      let sortIcon = wrapper.find('span.anticon-caret-up').at(0);
      sortIcon.simulate('click');

      let newFirstItem = wrapper.find("a").first().text();

      expect(firstItem.localeCompare(newFirstItem)).toEqual(1);
      wrapper.unmount();
    }, 1500);
  });

  test("User log table should load", () => {
    const wrapper = mount(<Router><UserLog/></Router>);
    expect(wrapper.find('table').instance()).toBeVisible();
  });

  test("Other components should render properly too", () => {
    let wrapper = mount(<Router><Statistics /></Router> );
    let statisticsTitle = wrapper.find('h1').text();
    wrapper.unmount();

    wrapper = mount(<Router><ShopProduct /></Router> );
    let productsTitle = wrapper.find('h1').text();
    wrapper.unmount();

    expect(statisticsTitle).toEqual("Statistics");
    expect(productsTitle).toEqual("Products");
  });

  test("User should be able to log out", () => {
    
    act( () => {
      const wrapper = mount(<Router><App /></Router> );

      setTimeout(() => {
        let productsTitle = wrapper.find('div.notification-bell');

        wrapper.find('li.ant-menu-submenu').simulate('click');
        wrapper.find('li.ant-menu-item').get(2).simulate('click');

        setTimeout(() => {
          expect(productsTitle).not.toBeVisible();
          wrapper.unmount();
        }, 500);
      }, 500);
    });
  });
});