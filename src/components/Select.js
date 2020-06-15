import React, { Component } from 'react';

export default class Select extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.onSelect(e);
  }

  render() {
    let options = this.props.options.map(option => {
      let value = option[this.props.valueKey];
      return (
        <option key={value} value={value}>{option[this.props.titleKey]}</option>
      );
    });

    options.unshift(<option key='all' value='all'>{this.props.allTitle}</option>);

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}
