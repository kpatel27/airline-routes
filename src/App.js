import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table';
import Select from './components/Select'

class App extends Component {
  state = {
    filterByAirline: 'all',
    filterByAirport: 'all',
  }

  filterByAirlines = (route) => {
    let selectedAirline = this.state.filterByAirline;
    return selectedAirline === 'all' || route.airline === selectedAirline;
  }

  filterByAirport = (route) => {
    let selectedAirport = this.state.filterByAirport;
    return selectedAirport === 'all' || route.src === selectedAirport || route.dest === selectedAirport;
  }

  onSelectAirline = (e) => {
    let airlineId = e.target.value;
    if (airlineId !== 'all') {airlineId = Number(airlineId)};
    this.setState({filterByAirline: airlineId});
  }

  onSelectAirport = (e) => {
    const airportCode = e.target.value;
    this.setState({filterByAirport: airportCode});
  }

  clearFilter = () => {
    this.setState({
      filterByAirline: 'all',
      filterByAirport: 'all',
    });
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

    const filteredRoutes = DATA.routes.filter(route => this.filterByAirport(route) && this.filterByAirlines(route));
    const filteredRoutesByAirline = DATA.routes.filter(this.filterByAirlines);
    const filteredRoutesByAirport = DATA.routes.filter(this.filterByAirport);
    const filteredAirlines = DATA.airlines.filter(airline => {
      return filteredRoutesByAirport.some(route => route.airline === airline.id );
    });
    const filteredAirports = DATA.airports.filter(airport => {
      return filteredRoutesByAirline.some(route => route.src === airport.code || route.dest === airport.code );
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          Show routes on
          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.filterByAirline}
            onSelect={this.onSelectAirline}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            value={this.state.filterByAirport}
            onSelect={this.onSelectAirport}
          />
          <button onClick={this.clearFilter}>Show All Routes</button>
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
