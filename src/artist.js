export default function artist() {
  return {
    getArtist: id => this.request(`${this.apiURL}/artists/${id}`),
    getArtists: ids => this.request(`${this.apiURL}/artists/?ids=${ids}`),
    getArtistAlbums: id => this.request(`${this.apiURL}/artists/${id}/albums`),
    getArtistTopTracks: id => this.request(`${this.apiURL}/artists/${id}/top-tracks`),
    getArtistRelated: id => this.request(`${this.apiURL}/artists/${id}/related-artists`),
  };
}
