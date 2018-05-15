import React, {Component} from 'react';
import {Button,Input} from 'antd';
import './App.css';

import {getCommitInfo} from './services/apis'
// const {ipcRenderer} = require('electron')

// console.log(require.resolve('electron'))
class App extends Component {

  state = {
    commitInfo: {
      userIcon: './github.jpg'
    },
    inputVisiable: false
  }

  componentDidMount() {
    // 本地获取username
    let username = window.localStorage.getItem('username')
    console.log('componentDidMount',username)
    this.setState({
      inputVisiable: !username
    })
    this.updateCommitInfo(username);
  }

  updateCommitInfo = async (username) => {
    console.log('componentDidMount',username)
    if(username) {
      const resp = await getCommitInfo(`/${username}`)
      if (resp) {
        console.log('resp', resp)
        this.setState({
          commitInfo: {
            ...this.state.commitInfo,
            ...resp
          }
        })
      }
    }
  }

  enterUsername = (e) => {
    window.localStorage.setItem('username',e.target.value)
  }

  changeUsername = () => {
    this.setState({
      inputVisiable: true
    })
    window.localStorage.removeItem('username')
  }
  render() {
    const {commitInfo,inputVisiable} = this.state

    return (
      <div>
        {/* {window.localStorage.getItem('username')} */}
        <div className="userIcon">
          <a href={commitInfo.gitIndex}  target="_blank">
            <img src={commitInfo.userIcon} alt={commitInfo.username} />
          </a>
        </div>
        {
          inputVisiable && <div className="userName">
            <Input placeholder="username" onChange={this.enterUsername}/>
          </div>
        }
        <div className="commitNums">
          <span>今日提交: {commitInfo.count || 0} 次</span>
          <span className="commitFill" style={{backgroundColor: commitInfo.fill}}></span>
        </div>

        <div className="buttons">
          <Button type="primary" onClick={() => this.updateCommitInfo()}>刷新</Button>
          <Button type="primary" onClick={this.changeUsername}>设置</Button>
        </div>
      </div>
    );
  }
}

export default App;