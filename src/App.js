import React, {Component} from 'react';
import {Button} from 'antd';
import './App.css';

// import {getElements} from './services/apis'

class App extends Component {

  async componentDidMount() {
    // const resp = await getElements()
    // if (resp) {
    //   console.log('resp', resp)
    // }
  }
  render() {
    return (
      <div>
        <div>input github account</div>
        <div>commit nums</div>
        <div>commit color</div>
        <div>user icon</div>
        <Button type="primary">刷新</Button>
        <Button type="primary">修改账户</Button>
      </div>
    );
  }
}

export default App;