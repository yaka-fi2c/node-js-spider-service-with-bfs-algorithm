import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            max_depth: '',
            max_pages: ''
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

    handleSubmit = e => {
        e.preventDefault();

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
                console.log(result)
            })
            .catch(() => { console.log('something went wrong'); })
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
                <button type="submit" className="btn btn-primary w-50">submit</button>
            </form>
        )
    }
}