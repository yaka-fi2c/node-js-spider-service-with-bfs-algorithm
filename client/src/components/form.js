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
            response: []
        }
    }

    handleUrlChange = event => {
        this.setState({ url: event.target.value });
    }

    handleDepthChange = event => {
        this.setState({ max_depth: event.target.value });
    }

    handlePagesChange = event => {
        this.setState({ max_pages: event.target.value });
    }

    passData(result) {
        this.props.onGetResults(result)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ fetching: true })

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
                this.setState({ fetching: false });
                this.setState({ fetched: true });
                this.passData(result);
            })
            .catch(() => {
                this.setState({ error: true });
                this.setState({ fetching: false });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="col-6 p-0">
                <div className="form-group">
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="url">URL:</label>
                    <input
                        name="url"
                        id="url"
                        type="text"
                        className="form-control mb-3"
                        onChange={this.handleUrlChange}
                    ></input>
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="depth"
                    >Max Depth:</label>
                    <input
                        name="depth"
                        id="depth"
                        type="number"
                        className="form-control mb-3"
                        onChange={this.handleDepthChange}
                    ></input>
                    <label
                        className="text-monospace font-weight-bold"
                        htmlFor="pages"
                    >Max Pages:</label>
                    <input
                        name="pages"
                        id="pages"
                        type="number"
                        className="form-control"
                        onChange={this.handlePagesChange}
                    ></input>
                </div>
                {this.state.fetching === true ? (<div className="alert alert-warning mt-3" role="alert">
                    Fetching data, please wait
                </div>) : null}
                {this.state.fetched === true ? (<div className="alert alert-success mt-3" role="alert">
                    URL scrapped successfully! results page: <a className="font-wegiht-bold">link</a>
                </div>) : null}
                {this.state.error === true ? (<div className="alert alert-danger mt-3" role="alert">
                    Sorry! something went wrong..
                </div>) : null}
                <button type="submit" className="btn btn-primary w-50">submit</button>
            </form>
        )
    }
}