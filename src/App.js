import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table';

class App extends Component {

  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value);
    } else {
      return DATA.getAirportByCode(value);
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = DATA.routes;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;
