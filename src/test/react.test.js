import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { mount, shallow, render } from 'enzyme'
import App from '../components/App'
import AppHeader from '../components/appHeader'
import Time from '../components/time'
import SubmitDeposit from '../components/submitDeposit'
import SubmitWithdraw from '../components/submitWithdraw'
import SubmitWinFromTicket from '../components/submitWinFromTicket'
import Transaction from '../components/transaction'

it('renders app root without crashing', () => {
 	expect(shallow(<App />).hasClass('App')).to.equal(true)
})

it('renders app header without crashing', () => {
  	expect(shallow(<AppHeader />).hasClass('AppHeader')).to.equal(true)
})

it('renders submit-deposit-input-box without crashing', () => {
	const wrapper = shallow(<SubmitDeposit />)
	expect(wrapper.find('div').childAt(0).type()).to.equal('p')
	expect(wrapper.find('div').childAt(1).type()).to.equal('input')
})

it('renders submit-withdraw-input-box without crashing', () => {
	const wrapper = shallow(<SubmitWithdraw />)
	expect(wrapper.find('div').childAt(0).type()).to.equal('p')
	expect(wrapper.find('div').childAt(1).type()).to.equal('input')
})

it('renders submit-winFromTicket-input-box without crashing', () => {
	const wrapper = shallow(<SubmitWinFromTicket />)
	expect(wrapper.find('div').childAt(0).type()).to.equal('p')
	expect(wrapper.find('div').childAt(1).type()).to.equal('input')
})

it('renders current time without crashing', () => {
	const wrapper = shallow(<Time />)
	expect(wrapper.hasClass('Time')).to.equal(true)
})


it('renders transation without crashing', () => {
  	const wrapper = shallow(<Transaction balance={20} />)
  	expect(wrapper.find('container').childAt(0).type()).to.equal('div')
  	expect(wrapper.find('#transactionDetailLineOne').childAt(0).type()).to.equal('span')
  	expect(wrapper.find('#transactionDetailLineTwo').childAt(1).type()).to.equal('span')


})