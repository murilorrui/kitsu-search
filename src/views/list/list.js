import React, { Component } from 'react';
import CharacterService from '../../service/characters';
import Modal from '../../components/modal';
import './list.sass';
import Card from '../../components/card';
import Pagination from '../../components/pagination';
import Search from '../../components/search';

class Home extends Component  {
  characterService = new CharacterService();

  constructor() {
    super();
    this.state = {
      characters: [],
      mediaLink: [],
      show: false,
      offset: 0,
      next: '',
      prev: '',
    };
    this.media = [];
    this.character = {};
  };

  getCharacters() {
    this.characterService.getCharacters(this.state.offset).then(resp => {
      this.setPayload(resp);
    });
  }

  getCharacterByName = (value) => {
    this.characterService.getCharacterByName(value).then(resp => {
      this.setPayload(resp);
    });
  }

  setPayload(resp) {
    const next = resp.data.links.next ? resp.data.links.next.slice(25) : '';
    const prev = resp.data.links.prev ? resp.data.links.prev.slice(25) : '';
    this.setState({
      characters: resp.data.data,
      next,
      prev
    });
  }

  showCharacterModal = (character) => {
    this.character = character;
    this.toggleModal();
  }

  toggleModal = () =>  {
    this.setState({
      show: !this.state.show,
    });
  }

  paginationAction = (orientation) => {
    const url = orientation === 'next' ? this.state.next : this.state.prev;
    this.characterService.getPagedCharacters(url).then(resp => {
      this.setPayload(resp);
    });
  }

  componentDidMount() {
    this.getCharacters();
  }

  render() {
    return (
      <div>
        <div className="container list__container">
          <Modal
            onClose={this.toggleModal}
            show={this.state.show}
            character={this.character}
            media={this.media}
            />
          <Search
            onSearch={this.getCharacterByName}
            />
          <div className="list__row">
            { this.state.characters.map(character => (
              <div className="list__col col-6" key={character.id}>
                <Card
                  cardAction={this.showCharacterModal}
                  character={character}
                  >
                </Card>
              </div>
            ))}
          </div>
          <Pagination
            action={this.paginationAction}
            prev={this.state.prev}
            next={this.state.next}
            />
        </div>
      </div>
    )
  }
}

export default Home;
