import React, { Component } from 'react';
import './App.css';
import Form from './components/form.js';
import DataTable from './components/table.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiResponse: []
    };
  }

  // get scraped data from child
  dataCallBack = (data) => {
    this.setState({ apiResponse: [...data] });
  };

  form = () => {
    return (
      <div className="col-6 pt-3">
        <Form onGetResults={this.dataCallBack} />
      </div>
    );
  };

  dataTable = () => {
    return (
      <div className="col-6 col-md-12 pt-3">
        {this.state.apiResponse.length !== 0 ? <div>
          <DataTable nodes={this.state.apiResponse} />
        </div> : null}
      </div>
    );
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="row">
          <h1 className="text-center">Spider service</h1>
        </div>
        <Router>
          <div className="row">
            <Route exact path="/" component={this.form} />
            <Route exact path="/results" component={this.dataTable} />
          </div>
          {this.state.apiResponse.length !== 0 ? <div className="row">
            <div className="alert alert-success mt-3 col-6" role="alert">
              URL scrapped successfully! results page: <Link className="font-wegiht-bold" to="/results">results</Link>
              &nbsp;<Link to="/">| another scrape?</Link>
            </div>
          </div> : null}
        </Router>
      </div>
    )
  }
}

export default App;
