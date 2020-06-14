import React, { Component } from 'react';

export default class Table extends Component {

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

    return (
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    )
  }
}
