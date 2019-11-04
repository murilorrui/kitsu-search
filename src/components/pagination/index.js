import React, { Component } from 'react';
import './pagination.sass';

class Pagination extends Component  {
  constructor(props) {
    super(props);
  };

  action(orientation) {
    this.props.action && this.props.action(orientation);
  };

  render() {
    return (
      <div className="row pagination">
        <button
          disabled={!this.props.prev}
          onClick={() => this.action('back')}
          className="pagination__buttons"
          >
          Back
        </button>
        <button
          disabled={!this.props.next}
          onClick={() => this.action('next')}
          className="pagination__buttons"
          >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination;
