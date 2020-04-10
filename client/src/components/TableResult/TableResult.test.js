import React from 'react';
import ReactDOM from 'react-dom';
import TableResult from './TableResult';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});