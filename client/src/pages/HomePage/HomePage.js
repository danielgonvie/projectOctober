import React, { Component } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

import RoomComponent from '../../components/RoomComponent/RoomComponent';
import socket from '../../components/Socket/Socket';
import "./HomePage.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

/*   componentDidMount() {
    socket.emit('conectado', '');
///////////////////////
console.log("entró en elñ componentdidmount")
if(this.state.recentUser === false){
  socket.on('getTime', socket.emit('sendTime', this.state.currentTime))
  console.log("envío del tiempo por aprte del cliente")
}
    socket.on('setTime', async (time) => {
      console.log(time, "socket tiempo");
      this.setState({
        ...this.state,
        opts: { ...this.state.opts,
          playerVars: {
            ...this.state.opts.playerVars,
            start: time
          }
        },
        currentTime: time
      })
    }
    );

/////////////////////////
    this.getSongs();
    if(this.state.songs.length != 0) {this.playVideo()};
    socket.on('addSong', async (song) => {
      console.log(song, "entró aquí")
      await this.setState({
        ...this.state,
        songs: [...this.state.songs, {_id: song.song._id, videoId: song.song.videoId, requestedBy: song.song.requestedBy}]
      })
      this.playVideo();
    })
  }

  playVideo(){
    if(this.state.songs.length == 0) {
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            ...this.state.opts.playerVars,
            autoplay: 1,
            controls: 1,
          }
        },
        videoCode: "_itnF681Eb4",
      })
    }else{
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            ...this.state.opts.playerVars,
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

  async searchQuery() {
    let userUrl = document.querySelector('#searchField').value;
    let params = userUrl.split('&');
    userUrl = params[0].split('=')[1];
    this.songService.addSong(userUrl, this.state.user.username)
    .then(async (song) => {
      console.log(song);
      socket.emit('newSong', song);
      await this.setState({
        ...this.state,
        songs: [...this.state.songs, {_id: song._id, videoId: song.videoId, requestedBy: song.requestedBy}]
      })
      this.playVideo();
    })

    console.log(this.state.songs, "procesado");
    if(this.state.songs.length == 1){
      this.playVideo();
    }
  }


  async nextSong() {
    console.log("finalisó")
    clearInterval(this.interval);
    if(this.state.songs.length != 0){
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

  }

  setTimer() {
    this.setState({
      ...this.state,
      recentUser: false
    })

    const that = this;
    var numero = 0;
    function timer() {
      numero++;
      that.setState({
        ...that.state,
        currentTime: numero
      });
      //chaos
      console.log(that.state.currentTime);
    }
    this.interval = setInterval(timer, 1000);
  }

  updateTime() {
    this.setState({
      ...this.state,
      currentTime: this.state.currentTime++
    });
    console.log(this.state.currentTime, "timer")
  } */



  render() {
    return (
      <div className="home-page">
        <h1 className="home-title">HOME PAGE</h1>
        <p>Bienvenido {this.state.user.username}</p>
        <RoomComponent user={this.state.user}></RoomComponent>
        <Link onClick={e => this.props.logout(e)} to="/">
          <h1>LOGOUT</h1>
        </Link>

      </div>
    );
  }
}
