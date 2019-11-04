import React, { Component } from 'react';
import CharacterService from '../../service/characters';
import './modal.sass';
import Galery from '../galery';

class Modal extends Component  {
  characterService = new CharacterService();

  constructor(props) {
    super(props);
    this.state = {
      media: [],
      mediaLink: [],
      loading: true,
    };
    this.media = [];
    this.getMedia = true;
  };

  onClose() {
    this.setState({
      mediaLink: [],
      media: [],
    })
    this.media = [];
    this.getMedia = true;
    this.props.onClose && this.props.onClose();
  };

  getMediaLink() {
    if (!this.getMedia) return;
    this.getMedia = false;
    this.characterService.getMediaLink(this.props.character.id).then(resp => {
      this.setState({ mediaLink: resp.data.data });
      this.getMediaCharacters();
    });
  }

  getMediaCharacters() {
    this.state.mediaLink.forEach((media, index) => {
      this.characterService.getMediaCharacters(media.id).then(resp => {
        this.media.push(resp.data.data);
        this.setState({
          media: this.media
        })
      });
      if (this.state.mediaLink.length === index + 1) {
        this.setState({
          loading: false,
        })
      }
    })
  }

  description() {
    return this.props.character.attributes.description ? this.props.character.attributes.description  : 'No description written.';
  }

  render() {
    const { media } = this.state;
    const { loading } = this.state;
    if (!this.props.show) return null;
    return (
      <div>
        {this.getMediaLink()}
        <div className="character-modal">
          <div className="character-modal__overlay">
            <div className="character-modal__card">
              <div className="row character-modal__header">
                <a
                  className="character-modal__header__close"
                  onClick={() => {
                    this.onClose();
                  }}
                  >
                </a>
              </div>
              <div className="row">
                <div className="col-4">
                  <img className="character-modal__avatar" src={this.props.character.attributes.image.original}/>
                </div>
                <div className="character-modal__content col-8">
                  <p className="character-modal__name">{this.props.character.attributes.name}</p>
                  <div className="character-modal__description" dangerouslySetInnerHTML={{ __html: this.description() }}></div>
                </div>
                <Galery
                  media={media}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
