import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { apiResponse: '' };
  }

  callApi() {
    fetch('http://localhost:9000/users')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1 className="App-title">Welcome To React</h1>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}

export default App;
