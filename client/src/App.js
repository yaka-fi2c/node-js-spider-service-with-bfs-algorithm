import React, { Component } from 'react';
import './App.css';
import Form from './form.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { apiResponse: '' };
  }

  // callApi() {
  //   fetch('http://localhost:9000/')
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err)
  // }

  // componentDidMount() {
  //   this.callApi();
  // }

  render() {
    return (
      <div className="container pt-5">
        <div className="row pb-5">
          <h1 className="text-center">Spider service task</h1>
        </div>
        <div className="row">
          <Form />
        </div>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}

export default App;
