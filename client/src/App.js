import React, { Component } from 'react';
import './App.css';
import Form from './components/form.js';
import DataTable from './components/table.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      apiResponse: [] 
    };
  }

  dataCallBack = (data) => {
    this.setState({ apiResponse: [...data]});
  };
  

  render() {
    return (
      <div className="container pt-5">
        <div className="row pb-5">
          <h1 className="text-center">Spider service task</h1>
        </div>
        <div className="row">
          <Form onGetResults={this.dataCallBack}/>
        </div>
        {this.state.apiResponse.length !== 0 ? <div className="row mt-5 mb-5">
          <DataTable nodes={this.state.apiResponse}/>
        </div> : null}
      </div>
    )
  }
}

export default App;
