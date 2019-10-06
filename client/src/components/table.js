import React, { Component } from 'react';
import './table.css';

export default class DataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes: this.props.nodes,
            currentRow: null
        };
    }

    showRow(i) {
        if (this.state.currentRow === i) {
            this.setState({ currentRow: null });
        } else {
            this.setState({ currentRow: i });
        }
    }


    render() {
        return (
            <table key={this.props.nodes}>
                <thead>
                    {this.state.nodes.map((el, i) => <tr onClick={() => { this.showRow(i) }} key={i}>
                        <th className="font-weight-bold" colSpan="3">
                            {el.title}
                            <div className={this.state.currentRow === i ? 'show' : 'hide'} >
                                <p>depth: {el.depth}</p>
                                <p>url scraped: <a target="_blank" href={el.url}>{el.url}</a></p>
                                <p>number of child links:{el.links.length}</p>
                                <ul>
                                    {el.links.map(link =>
                                        <li><a href={link} target="_blank">{link}</a></li>
                                    )}
                                </ul>
                            </div>
                        </th>
                    </tr>)}
                </thead>
            </table>
        );
    }
}