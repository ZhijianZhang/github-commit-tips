import React, {Component} from 'react';
import {Button} from 'antd';
import './App.css';

import {getCommitInfo} from './services/apis'
// const {ipcRenderer} = require('electron')

class App extends Component {

  constructor() {
    super(...arguments)
    //在渲染器进程 (网页) 中。
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
    // ipcRenderer.send('asynchronous-message', 'ping')
  }

  state = {
    commitInfo: ''
  }

  async componentDidMount() {
    const resp = await getCommitInfo('/ZhijianZhang')
    if (resp) {
      console.log('resp', resp)
      this.setState({
        commitInfo: JSON.stringify(resp)
      })
    }
  }
  render() {
    const {commitInfo} = this.state
    return (
      <div>
        <div>input github account</div>
        <div>commit nums</div>
        <div>commit color</div>
        <div>user icon</div>
        <div>{commitInfo}</div>
        <Button type="primary">刷新</Button>
        <Button type="primary">修改账户</Button>
      </div>
    );
  }
}

export default App;