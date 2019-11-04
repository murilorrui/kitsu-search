import http from './http';

export default class CharacterService {

  getCharacters = (offset) => {
    return http.get(`/characters?page[limit]=10&page[offset]=${offset}`);
  }

  getPagedCharacters = (url) => {
    return http.get(url);
  }

  getCharacterByName = (name) => {
    if (name === '') return this.getCharacters();
    return http.get(`/characters?filter[name]=${name}`);
  }

  getMediaLink = (id) => {
    return http.get(`/characters/${id}/media-characters`);
  }

  getMediaCharacters = (id) => {
    return http.get(`/media-characters/${id}/media`);
  }
}
