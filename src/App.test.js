import React from "react";
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react";
import App from "./App";


describe("Test", () => {
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

  test("initial test", () => {
  
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);

    


    expect(true).toBeTruthy();
  });
});

