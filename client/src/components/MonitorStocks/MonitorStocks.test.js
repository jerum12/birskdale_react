import React from 'react';
import ReactDOM from 'react-dom';
import MonitorStocks from './MonitorStocks';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonitorStocks />, div);
  ReactDOM.unmountComponentAtNode(div);
});