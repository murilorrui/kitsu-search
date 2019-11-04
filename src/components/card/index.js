import React, { Component } from 'react';
import './card.sass';

class Card extends Component  {
  constructor(props) {
    super(props);
  };

  openModal() {
    this.props.cardAction && this.props.cardAction(this.props.character);
  };

  addDetailClass(id) {
    const card = document.getElementById("character-card" + id);

    const detail = card.getElementsByClassName("character-card__character");
    detail[0].classList.add('character-card__character-details');

    const description = card.getElementsByClassName('character-card__character__description');
    description[0].style.opacity = 1;
    description[0].style.height = '100px';

    const name = card.getElementsByClassName('character-card__character__name');
    name[0].style.opacity = 1;
  }

  removeDetailClass(id) {
    const card = document.getElementById("character-card" + id);

    const detail = card.getElementsByClassName("character-card__character");
    detail[0].classList.remove('character-card__character-details');

    const description = card.getElementsByClassName('character-card__character__description');
    description[0].style.opacity = 0;
    description[0].style.height = '0px';

    const name = card.getElementsByClassName('character-card__character__name');
    name[0].style.opacity = .7;
  }

  description(text) {
    return text.substring(0, 90) + '</br> <strong>CLICK TO READ MORE</strong>';
  }

  avatar() {
    return this.props.character.attributes.image ? this.props.character.attributes.image.original : '';
  }

  render() {
    return (
      <div
        id={"character-card" + this.props.character.id}
        onMouseEnter={() => this.addDetailClass(this.props.character.id)}
        onMouseLeave={() => this.removeDetailClass(this.props.character.id)}
        className="character-card"
        onClick={() => {
          this.openModal();
        }}
        >
        <div className="character-card__content">
          <div>
              <img className="character-card__avatar" src={this.avatar()}/>
          </div>
          <div className="character-card__character">
            <p className="character-card__character__name">{this.props.character.attributes.name}</p>
            <p className="character-card__character__description" dangerouslySetInnerHTML={{ __html: this.description(this.props.character.attributes.description) }}></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
