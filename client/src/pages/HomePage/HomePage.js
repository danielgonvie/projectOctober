import React, { Component } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

import ChatBox from '../../components/ChatBox/ChatBox';
import socket from '../../components/Socket/Socket';
import SongService from '../../services/SongService';
import "./HomePage.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.songService = new SongService();
    this.state = {
      user: this.props.user,
      opts: {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          height: '390',
          width: '640',
          autoplay: 0,
          controls: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0
        }
      },
      videoCode: '',
      songs: [],
      currentTime: 0
    };
  }

  componentDidMount() {  
    socket.emit('conectado', "hola desde cliente");
    console.log(this.state.songs.length, "al prinsipio")
    this.getSongs();
    if(this.state.songs.length != 0) {this.playVideo()};
  }

  playVideo(){
    console.log(this.state.songs, "al prinsipio2")
    if(this.state.songs.length == 0) {
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            autoplay: 1,
            controls: 1,
          }
        },
        videoCode: "_itnF681Eb4",
      })
    }else{
      console.log("entro aqui")
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            autoplay: 1,
            controls: 1,
          }
        },
        videoCode: this.state.songs[0].videoId,
        currentTime: this.state.currentTime
      })
    }
  }

  getSongs = () => {
    this.songService.fetchSongs()
    .then(
      async (songs) => {
        await this.setState({ ...this.state, songs: songs});
        this.playVideo();
      }
    )
  }

  async searchQuery(param) {
    let userUrl = document.querySelector('#searchField').value;
    let params = userUrl.split('&');
    userUrl = params[0].split('=')[1];
    await this.setState({
      ...this.state,
      songs: [...this.state.songs, userUrl]
    })
    console.log(this.state.songs, "procesado");
  }


  async nextSong() {
    console.log("finalisó")
    console.log(this.state.songs[0]._id)
    this.songService.deleteSong(this.state.songs[0]._id)
    .then(song => console.log(song, "song deleted"))
    .catch(error => console.log(error));
    let arr = this.state.songs;
      arr.shift();
      await this.setState({
        ...this.state,
        songs: arr,
      })
      console.log(arr, "el array sin la primera loco")
    this.playVideo();
  }

  render() {

    return (
      <div className="home-page">
        <h1 className="home-title">YOU ARE IN THE HOME BTW</h1>
        <p>Bienvenido {this.state.user.username}</p>
        <ChatBox user={this.state.user}></ChatBox>
        <Link onClick={e => this.props.logout(e)} to="/">
            <h1>LOGOUT</h1>
          </Link>


        <input type="text" id="searchField" name="searchField" />
        <button onClick={e => this.searchQuery()}>Search</button>
        <YouTube
            videoId={this.state.videoCode}
            containerClassName="embed embed-youtube"
            onEnd={(e) => this.nextSong()}
            opts={this.state.opts}
          />

      </div>
    );
  }
}
