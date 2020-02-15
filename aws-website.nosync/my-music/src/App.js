import React, { Component } from 'react';

import Navbar from './components/Navbar';

class App extends Component {
  state = {
    isLoaded: false,
    song: null,
    songs: null,
    songUrl: null,
    selectedSongIdx: null
  };

  componentDidMount() {
    fetch('http://3.82.61.176:4444')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ songs: data, isLoaded: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderSongs() {
    const { songs } = this.state;

    return (
      <tbody>
        {songs.map((s, index) => {
          return (
            <tr key={index}>
              <td>{songs[index].artist}</td>
              <td>{songs[index].album}</td>
              <td>
                {songs[index].song
                  .split('.')
                  .slice(0, -1)
                  .join('.')}
              </td>
              <td>
                <button
                  className="btn-floating btn-small teal darken-3"
                  onClick={() => this.selectSong(index)}
                >
                  <i className="small material-icons">play_arrow</i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  selectSong(index) {
    const { songs } = this.state;
    const selectedSong = songs[index];
    var songKey = `${selectedSong.artist}/${selectedSong.album}/${selectedSong.song}`;

    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: songKey
      })
    };

    fetch('http://3.82.61.176:4444', params)
      .then(res => res.json())
      .then(res => {
        // help from -- https://stackoverflow.com/a/43578104/9487966
        this.setState({ songUrl: res.url, selectedSongIdx: index }, () => {
          this.refs.audio.pause();
          this.refs.audio.load();
          this.refs.audio.play();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  playSong() {
    const { songUrl, songs, selectedSongIdx } = this.state;
    return (
      <div className="center">
        <p>
          {songs[selectedSongIdx].artist +
            ' - ' +
            songs[selectedSongIdx].song
              .split('.')
              .slice(0, -1)
              .join('.')}
        </p>
        <audio controls autoPlay ref="audio">
          <source src={songUrl} type="audio/mp4" />
        </audio>
      </div>
    );
  }

  render() {
    const { songUrl } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          {songUrl ? this.playSong() : null}
          <table>
            <thead>
              <tr>
                <th>Artist</th>
                <th>Album</th>
                <th>Song</th>
                <th></th>
              </tr>
            </thead>
            {this.state.isLoaded ? this.renderSongs() : null}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
