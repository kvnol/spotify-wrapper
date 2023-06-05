/* global fetch */
import search from './search';
import album from './album';
import artist from './artist';

import API_URL from './config';
import toJSON from './utils';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    this.album = album.bind(this)();
    this.search = search.bind(this)();
    this.artist = artist.bind(this)();
  }

  accessToken() {
    return new Promise((resolve, reject) => {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
      })
      .then(toJSON)
      .then((data) => {
        this.access_token = data.access_token;
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  }

  request(url) {
    return this.accessToken()
      .then(() => {
        const headers = {
          headers: {
            Authorization: `'Bearer ${this.access_token}'`,
          },
        };

        return fetch(url, headers).then(toJSON);
      })
      .catch(err => console.error(err));
  }
}
