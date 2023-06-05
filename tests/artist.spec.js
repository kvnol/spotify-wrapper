import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src';

describe('Artist', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ artist: 'name' }) });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getArtist method', () => {
      expect(spotify.artist.getArtist).to.exist;
    });

    it('should have getArtists method', () => {
      expect(spotify.artist.getArtists).to.exist;
    });

    it('should have getArtistAlbums method', () => {
      expect(spotify.artist.getArtistAlbums).to.exist;
    });

    it('should have getArtistTopTracks method', () => {
      expect(spotify.artist.getArtistTopTracks).to.exist;
    });

    it('should have getArtistTopTracks method', () => {
      expect(spotify.artist.getArtistRelated).to.exist;
    });
  });

  describe('getArtist', () => {
    it('should call fetch method', () => {
      const artist = spotify.artist.getArtist();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artist = spotify.artist.getArtist('0TnOYISbd1XYRBk9myaseg');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg');

      const artist2 = spotify.artist.getArtist('0TnOYISbd1XYRBk9myase');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myase');
    });

    it('should return the correct data from Promise', () => {
      const artist = spotify.artist.getArtist('0TnOYISbd1XYRBk9myaseg');
      artist.then((data) => {
        expect(data).to.be.eql({ artist: 'name' });
      });
    });
  });

  describe('getArtists', () => {
    it('should call fetch method', () => {
      const artists = spotify.artist.getArtists();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artists = spotify.artist.getArtists(['0TnOYISbd1XYRBk9myaseg', '0TnOYISbd1XYRBk9mya4tt5']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/?ids=0TnOYISbd1XYRBk9myaseg,0TnOYISbd1XYRBk9mya4tt5');
    });

    it('should return the correct data from Promise', () => {
      const artist = spotify.artist.getArtists(['0TnOYISbd1XYRBk9myaseg', '0TnOYISbd1XYRBk9mya4tt5']);
      artist.then((data) => {
        expect(data).to.be.eql({ artist: 'name' });
      });
    });
  });

  describe('getArtistAlbums', () => {
    it('should call fetch method', () => {
      const artist = spotify.artist.getArtistAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artist = spotify.artist.getArtistAlbums('0TnOYISbd1XYRBk9myaseg');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums');
    });

    it('should return the correct data from Promise', () => {
      const artist = spotify.artist.getArtistAlbums('0TnOYISbd1XYRBk9myaseg');
      artist.then((data) => {
        expect(data).to.be.eql({ artist: 'name' });
      });
    });
  });

  describe('getArtistTopTracks', () => {
    it('should call fetch method', () => {
      const artist = spotify.artist.getArtistTopTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artist = spotify.artist.getArtistTopTracks('0TnOYISbd1XYRBk9myaseg');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks');

      const artist2 = spotify.artist.getArtistTopTracks('0TnOYISbd1XYRBk9myasegfsdf');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myasegfsdf/top-tracks');
    });

    it('should return the correct data from Promise', () => {
      const artist = spotify.artist.getArtistTopTracks('0TnOYISbd1XYRBk9myaseg');
      artist.then((data) => {
        expect(data).to.be.eql({ artist: 'name' });
      });
    });
  });

  describe('getArtistRelated', () => {
    it('should call fetch method', () => {
      const artist = spotify.artist.getArtistRelated();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const artist = spotify.artist.getArtistRelated('0TnOYISbd1XYRBk9myaseg');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/related-artists');

      const artist2 = spotify.artist.getArtistRelated('0TnOYISbd1XYRBk9myasegfsdf');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myasegfsdf/related-artists');
    });

    it('should return the correct data from Promise', () => {
      const artist = spotify.artist.getArtistRelated('0TnOYISbd1XYRBk9myaseg');
      artist.then((data) => {
        expect(data).to.be.eql({ artist: 'name' });
      });
    });
  });
});
