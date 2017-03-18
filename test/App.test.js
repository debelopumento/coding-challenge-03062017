import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/components/App'
import { expect } from 'chai'
import { mount, shallow, render } from 'enzyme'


it('renders without crashing', () => {
  expect(shallow(<App />).hasClass("App")).to.equal(true);
});

