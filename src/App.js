import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
  }

  renderTableData() {
    return DATA.routes.map((flight, idx) => {
      const { airline, src, dest } = flight
      return (
        <tr key={idx}>
          <td>{airline}</td>
          <td>{src}</td>
          <td>{dest}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <table>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Source</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
