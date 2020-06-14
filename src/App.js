import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table';

class App extends Component {
  state = {
    filterByAirline: 'all',
  }

  filterByAirlines(id) {
    if (id === 'all') return DATA.routes;
    return DATA.routes.filter(route => id === route.airline);
  }

  onSelectAirline = (e) => {
    const airlineId = Number(e.target.value);
    this.setState({filterByAirline: airlineId});
  }

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

    const filteredRoutes = this.filterByAirlines(this.state.filterByAirline);
    const airlinesList = DATA.airlines.map(airline => {
      return (<option key={airline.id} value={airline.id}>{airline.name}</option>);
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <label htmlFor='airline-select'>Show routes on</label>
          <select id='airline-select' onChange={this.onSelectAirline}>
            {airlinesList}
          </select>
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
