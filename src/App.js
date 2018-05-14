import React, {Component} from 'react';
import {Button} from 'antd';
import {inject, observer} from 'mobx-react'
import Home from './containers/Home'
import './App.css';

import {getElements} from './services/apis'

@inject('pageStore')
@observer
class App extends Component {

  async componentDidMount() {
    const resp = await getElements()
    if (resp) {
      console.log('resp', resp)
    }
  }
  render() {
    const {name} = this.props.pageStore
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;