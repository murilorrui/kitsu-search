import React, { Component } from 'react';
import './search.sass';

class Search extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  };

  handleChange = (event) => {
   this.setState({
     value: event.target.value
   });
  }

  action = () => {
    this.props.onSearch && this.props.onSearch(this.state.value);
  };

  clear = () => {
    this.setState({
      value: '',
    })
    this.action();
  }

  render() {
    return (
      <div className="row search">
        <div className="col-8">
          <input
            type="text"
            placeholder="Search"
            value={this.state.value}
            onChange={this.handleChange}
            >
          </input>
        </div>
        <div className="search__button col-2">
          <button onClick={this.action}>
            Confirm
          </button>
        </div>
        <div className="search__button col-2">
          <button onClick={this.clear}>
            Clear
          </button>
        </div>
      </div>
    )
  }
}

export default Search;
