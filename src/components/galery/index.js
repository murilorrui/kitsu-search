import React, { Component } from 'react';
import './galery.sass';

class Search extends Component  {
  constructor(props) {
    super(props);
  };

  text() {
    return this.props.loading ?  'Loading...' : '';
  }

  render() {
    return (
      <div className="row galery">
        <div className="col-12">
          <strong>Medias:</strong>
        </div>
        { this.props.media.length === 0 && (
          <p>{this.text()}</p>
        )}
        { this.props.media.map(payload => (
          <div className="col-3 galery__media" key={payload.id}>
            <img className="galery__img"src={payload.attributes.posterImage.tiny}/>
            <div className="galery__content">
              <p className="galery__name">{payload.attributes.titles.en_jp}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Search;
