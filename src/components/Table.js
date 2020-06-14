import React, { Component } from 'react';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      perPage: 25,
    };
  }

  handleClickNext = e => {
    this.setState({
      page: this.state.page + 1
    });
  }

  handleClickPrevious = e => {
    this.setState({
      page: this.state.page - 1
    });
  }

  render() {
    const headers = this.props.columns.map(col => <th key={col.name}>{col.name}</th>);
    const tableRows = this.props.rows.map(row => {
      const tableRow = this.props.columns.map(col => {
        const data = this.props.format(col.property, row[col.property]);
        return (<td key={col.property + data}>{data}</td>);
      });
      return (
        <tr key={`${row.airline}:${row.src}:${row.dest}`}>
          {tableRow}
        </tr>
      );
    });

    const start = this.state.page * this.state.perPage;
    const end = (this.state.page + 1) * this.state.perPage;
    const rowsToDisplay = tableRows.slice(start, end);

    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay}
          </tbody>
        </table>
        <div className='pagination'>
          <p>Showing {start + 1}-{end} of {tableRows.length} routes</p>
          <button
            disabled={start === 0}
            onClick={this.handleClickPrevious}
          >
            Previous Page
          </button>
          <button
            disabled={end >= tableRows.length}
            onClick={this.handleClickNext}
          >
            Next Page
          </button>
        </div>
      </div>
    )
  }
}
