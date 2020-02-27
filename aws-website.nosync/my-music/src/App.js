import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Auth from './components/Auth';

const API_ADDRESS = 'http://54.205.128.64:8080';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isLoaded: false,

      genres: null,
      selectedGenre: null,

      artists: null,
      selectedArtist: null,

      albums: null,
      selectedAlbum: null,

      songs: null,
      selectedSong: null,
      selectedSongIdx: null,
      songUrl: null
    };
  }

  componentDidMount() {
    fetch(`${API_ADDRESS}/genres`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ genres: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAuthData = authData => {
    this.setState({
      isLoggedIn: authData.isLoggedIn,
      isLoaded: true,
      selectedGenre: null,
      selectedArtist: null,
      selectedAlbum: null,
      selectedSong: null
    });
  };

  renderGenres() {
    const { genres } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    className={'btn teal darken-3'}
                    onClick={() => {
                      this.selectGenre(index);
                      this.setState({
                        selectedArtist: null,
                        selectedAlbum: null,
                        selectedSong: null
                      });
                    }}
                  >
                    {genre}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderArtists() {
    const { artists } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Artists</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist, index) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    className={'btn teal darken-3'}
                    onClick={() => {
                      this.selectArtist(index);
                      this.setState({
                        selectedAlbum: null,
                        selectedSong: null
                      });
                    }}
                  >
                    {artist}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderAlbums() {
    const { albums } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Albums</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album, index) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    className={'btn teal darken-3'}
                    onClick={() => {
                      this.selectAlbum(index);
                      this.setState({
                        selectedSong: null
                      });
                    }}
                  >
                    {album}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderSongs() {
    const { songs } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Songs</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    className={'btn teal darken-3'}
                    onClick={() => this.selectSong(index)}
                  >
                    {song}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  playSong() {
    const { songUrl } = this.state;

    return (
      <audio controls autoPlay ref="audio" id="audio">
        <source src={songUrl} type="audio/mp4" />
      </audio>
    );
  }

  selectGenre(index) {
    const { genres } = this.state;
    const selectedGenre = genres[index];

    fetch(`${API_ADDRESS}/artists/for/genre?genre=${selectedGenre}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ artists: data, selectedGenre });
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectArtist(index) {
    const { artists } = this.state;
    const selectedArtist = artists[index];

    fetch(`${API_ADDRESS}/albums/for/artist?artist=${selectedArtist}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ albums: data, selectedArtist });
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectAlbum(index) {
    const { albums } = this.state;
    const selectedAlbum = albums[index];

    fetch(`${API_ADDRESS}/songs/for/album?album=${selectedAlbum}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ songs: data, selectedAlbum });
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectSong(index) {
    const { songs } = this.state;
    const selectedSong = songs[index];

    fetch(`${API_ADDRESS}/song?song=${selectedSong}`)
      .then(res => res.json())
      .then(data => {
        this.setState(
          { songUrl: data.url, selectedSong, selectedSongIdx: index },
          () => {
            this.refs.audio.pause();
            this.refs.audio.load();
            this.refs.audio.play();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      selectedGenre,
      selectedArtist,
      selectedAlbum,
      selectedSong
    } = this.state;

    return (
      <div>
        <Navbar />
        <Auth getAuthData={this.getAuthData} />
        <div className="container center">
          {selectedSong ? (
            <div className="musicPlayer teal darken-3">
              <h5>
                {selectedArtist} - {selectedSong}
              </h5>
              {this.playSong()}
            </div>
          ) : null}
          {this.state.isLoggedIn ? this.renderGenres() : null}
          {selectedGenre ? this.renderArtists() : null}
          {selectedArtist ? this.renderAlbums() : null}
          {selectedAlbum ? this.renderSongs() : null}
        </div>
      </div>
    );
  }
}

export default App;
