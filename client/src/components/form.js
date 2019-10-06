import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            max_depth: '',
            max_pages: '',
            fetching: false,
            fetched: false,
            error: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    // get inputs value 
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to parent component
    passData(result) {
        this.props.onGetResults(result)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ fetching: true, fetched: false, error: false })

        const url = 'http://localhost:9000/scrape';

        const params = {
            url: this.state.url,
            max_depth: this.state.max_depth,
            max_pages: this.state.max_pages
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ fetching: false, fetched: true });
                this.passData(result);
            })
            .catch(() => {
                this.setState({ error: true, fetching: false });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="col-lg-6 col-md-12 p-0">

                <div className="form-group">
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="url">URL:</label>
                    <small className="ml-3 text-muted">
                        please start your url with http://
                    </small>
                    <input
                        name="url"
                        id="url"
                        type="text"
                        className="form-control mb-3"
                        onChange={this.handleInputChange}
                    ></input>
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="depth"
                    >Max Depth:</label>
                    <input
                        name="max_depth"
                        id="depth"
                        type="number"
                        className="form-control mb-3"
                        onChange={this.handleInputChange}
                    ></input>
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="pages"
                    >Max Pages:</label>
                    <input
                        name="max_pages"
                        id="pages"
                        type="number"
                        className="form-control"
                        onChange={this.handleInputChange}
                    ></input>
                </div>
                {this.state.fetching === true ? (<div className="alert alert-warning mt-3" role="alert">
                    Fetching data, it might take some time..
                </div>) : null}
                {this.state.error === true ? (<div className="alert alert-danger mt-3" role="alert">
                    Sorry! something went wrong..
                </div>) : null}
                <button type="submit" className="btn btn-primary w-100">submit</button>
            </form>
        )
    }
}