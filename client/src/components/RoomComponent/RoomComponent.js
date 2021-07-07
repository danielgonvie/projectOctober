import React, { Component } from "react";
// import { Link } from "react-router-dom";
import RoomService from '../../services/RoomService';
import UserService from '../../services/UserService';
import YouTube from "react-youtube";
import socket from '../Socket/Socket';
import "./RoomComponent.scss";


export default class RoomComponent extends Component {
  constructor(props) {
    super(props);
    this.roomService = new RoomService();
    this.userService = new UserService();
    this.state = {
      user: this.props.user,
      inputMessage: "",
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
      recentUser: true,
      player: '',
      videoInfo: {}
    };
  }

  displayRooms = () => {
    const { rooms } = this.state;
    return rooms.map((room, i) => <p className="room-selection" key={i} onClick={ev => this.updateRoom(room._id)}>{room.name}</p>)
  }

  displayMessages = () => {
    const messages = this.state.selectedRoom.content;
    return messages.map((message, i) => 
    <div key={i} className="chat-bubble">
      <h1 className="message-author">{message.owner} :</h1>
      <p className="message-text">{message.message}</p>
    </div>
  )
  }

  displayPlayer = () => {
    return (
      <>
        <input type="text" id="searchField" name="searchField" />
        <button onClick={e => this.searchQuery()}>Search</button>
      </>
    )
  }

  updateRooms = () => {
    this.roomService.fetchRooms()
    .then(
      (rooms) => {
        this.setState({ ...this.state, rooms: rooms})
      }
    )
  }

  updateRoom = (id) => {
    socket.off('updateUsers');
    socket.off('getTime');
    if (this.state.selectedRoom) {
      var previousRoom = this.state.selectedRoom._id;
      socket.emit('leaveRoom', previousRoom, this.state.selectedRoom.currentUsers, this.state.user._id)
    }
    clearInterval(this.interval);
    this.roomService.fetchOneRoom(id)
    .then(
      async (room) => {
        let arr = room.currentUsers;
        if (!room.currentUsers.includes(this.state.user._id)){
          arr.push(this.state.user._id);
        }
        console.log("!!!!!!!!!!!!!!", room);
        if(room.leader !== undefined && room.leader !== '' && room.leader !== null){
          await this.setState({ ...this.state, selectedRoom: {...room, currentUsers: arr}})
        } else {
          await this.setState({ ...this.state, selectedRoom: {...room, currentUsers: arr, leader: this.state.user._id}})
        }
        console.log("!!!!!!!!!!!!!!", this.state.selectedRoom);
        socket.emit('joinedRoom', room._id, this.state.selectedRoom.currentUsers, this.state.user._id, this.state.selectedRoom.leader)
        
        socket.on('setTime', async (roomId, time) => {
          console.log("he recibido el time", time);
          socket.off('setTime');
          if(roomId === this.state.selectedRoom._id){
            await this.setState({
              ...this.state,
              selectedRoom: {
                ...this.state.selectedRoom,
                currentTime: time,
              },
              opts: {...this.state.opts,
                playerVars: {
                  ...this.state.opts.playerVars,
                  autoplay: 1,
                  controls: 0,
                  start: time //
                }
              },
              recentUser: false,
              videoCode: this.state.selectedRoom.songs[0].videoId,
            })
          }
          this.setTimer();
          
        })

        socket.on('updateUsers', (roomId, updatedUsers) => {
          if(roomId === this.state.selectedRoom._id){
            this.setState({
              ...this.state,
              selectedRoom: {
                ...this.state.selectedRoom,
                currentUsers: updatedUsers,
              }
            })
          }
          }
        );

        if(this.state.selectedRoom.leader === this.state.user._id){
          socket.on('getTime', roomId => {
          console.log("peudo hacer getTime")
          if(roomId === this.state.selectedRoom._id){
            console.log(this.state.selectedRoom, "que lleva la sala en este momento")
          socket.emit('sendTime', this.state.selectedRoom._id, this.state.selectedRoom.currentTime, this.state.user._id);
          }
        })
        }
        console.log(this.state.selectedRoom.currentUsers.length, "ISTO QUE E PA")
        if(this.state.selectedRoom?.currentUsers.length === 1){
          this.setState({...this.state, recentUser: false});
          socket.off('setTime');
          if(this.state.selectedRoom.songs.length === 0){
            await this.setState({
              ...this.state,
              opts: {...this.state.opts,
                playerVars: {
                  ...this.state.opts.playerVars,
                  autoplay: 1,
                  controls: 0,
                  start: 0
                }
              },
              videoCode: 'W7tWE_leySI',
            })
          } else {
            console.log(">>>>>>>>>>>>>>>>", this.state.selectedRoom);
            await this.setState({
              ...this.state,
              opts: {...this.state.opts,
                playerVars: {
                  ...this.state.opts.playerVars,
                  autoplay: 1,
                  controls: 0,
                  start: this.state.selectedRoom.currentTime //
                }
              },
              videoCode: this.state.selectedRoom.songs[0].videoId,
            })
          }

          this.setTimer();
        } else {
          console.log(">>>>>>>>>>>>>>>>", this.state.selectedRoom);
          
        }
      }
    )
  }

  async nextSong() {
    console.log("finalisó")
    clearInterval(this.interval);
    if(this.state.selectedRoom.songs.length !== 0){
      let arr = this.state.selectedRoom.songs;
      arr.shift();
      await this.setState({
        ...this.state,
        selectedRoom: {
          ...this.state.selectedRoom,
          songs: arr,
        }
      })
      console.log(this.state.selectedRoom.songs, "pero bueno, sin el primero se supone")
      this.roomService.deleteSong(this.state.selectedRoom._id, this.state.selectedRoom.songs)
      .then(room => console.log(room, "room updated"))
      .catch(error => console.log(error));
      this.playVideo();
  }
  }

  setTimer() {
    const that = this;
    var numero = this.state.selectedRoom.currentTime;
    function timer() {
      numero++;
      that.setState({
        ...that.state,
        selectedRoom: {
          ...that.state.selectedRoom,
          currentTime: numero
        }
      });
      //chaos
      //console.log(that.state.selectedRoom);
    }
    this.interval = setInterval(timer, 1000);
  }

  playVideo(){
    if(this.state.selectedRoom.songs.length === 0) {
      console.log("entró al play next vacío")
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            ...this.state.opts.playerVars,
            autoplay: 1,
            controls: 0,
            start: 0
          }
        },
        videoCode: "_itnF681Eb4",
      })
    } else {
      console.log("entró al play next bueno", this.state.selectedRoom)
      this.setState({
        ...this.state,
        opts: {...this.state.opts,
          playerVars: {
            ...this.state.opts.playerVars,
            autoplay: 1,
            controls: 0,
            start: 0
          }
        },
        videoCode: this.state.selectedRoom.songs[0].videoId,
      })
      console.log("el video code?", this.state.videoCode)
    }
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.roomService.sendMessage(this.state.selectedRoom._id, this.state.inputMessage, this.state.user.username)
    .then(
      (message) => {
        socket.emit(`mensaje`, this.state.user.username, this.state.inputMessage, this.state.selectedRoom._id,)
        this.setState({ ...this.state, inputMessage: ""})
      }
    )
  }

  async searchQuery() {
    console.log(this.state.selectedRoom, "a ver")
    let userUrl = document.querySelector('#searchField').value;
    let params = userUrl.split('&');
    userUrl = params[0].split('=')[1];
    this.roomService.addSong({videoId: userUrl, requestedBy: this.state.user.username}, this.state.selectedRoom.songs, this.state.selectedRoom._id)
    .then(async (room) => {
      console.log(room);
/*       socket.emit('newSong', room); */
      if(this.state.selectedRoom.songs.length !== 0){
        this.setState({
          ...this.state,
          selectedRoom: {
            ...this.state.selectedRoom,
            songs: [...this.state.selectedRoom.songs, ...room.songs],
          }
        })
      } else {
        this.setState({
          ...this.state,
          selectedRoom: {
            ...this.state.selectedRoom,
            songs: [...this.state.selectedRoom.songs, ...room.songs],
          },
          videoCode: room.songs[0].videoId
        })
      }

    })
  }

  componentDidMount() {
    this.updateRooms()
    socket.emit('conectado', '');
    socket.on('mensajes', mensaje => {
      if(mensaje.roomId === this.state.selectedRoom._id){
        let allMensajes = this.state.selectedRoom.content;
        allMensajes.push(mensaje);
        this.setState({ ...this.state, selectedRoom: {...this.state.selectedRoom, content: allMensajes}})
        let chatWindow = document.querySelector('.chat-messages')
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  checkName = (owner) => {
    this.userService.checkUserName(owner)
    .then(
      (user) => {
        console.log(user.name);
        return user.name;
      }
    )
  }

  getPlayer(ev){
    this.setState({ ...this.state, player: ev.target });
  }

  async getData(){
    let auxObj = await this.state.player.getVideoData()
    this.setState({ ...this.state, videoInfo: auxObj });
  }

  render() {
    const { rooms } = this.state;
    const { selectedRoom } = this.state;
    let videoPlayer;
    if (this.state.recentUser){
      videoPlayer = <h1>Cargando...</h1>
    } else {
      videoPlayer = <YouTube
      onReady={(ev) => this.getPlayer(ev)}
      onPlay={ev => this.getData()}
      videoId={this.state.videoCode}
      containerClassName="embed embed-youtube"
      onEnd={(e) => this.nextSong()}
      opts={this.state.opts}
    />
    }

    return (
      <>
      <div className="chat-box">
        <div className="chat-rooms">
          <h1 className="salas-title">Salas</h1>
          {rooms && this.displayRooms()}
          {!rooms && <p>Loading rooms...</p> }
        </div>
        <div className="chat-container">
    <h1 className="room-title">{this.state.selectedRoom?.name}</h1>
    {selectedRoom && <p>{this.state.selectedRoom.currentUsers.length}</p>}
          <div className="chat-messages">
          {selectedRoom && this.displayMessages()}
          {!selectedRoom && <p>Pick a room...</p> }
          </div>
          <div className="chat-input">
            <input 
            type="text"
            className="send-content" 
            name="inputMessage" 
            onChange={e => this.handleChange(e)} 
            value={this.state.inputMessage}
            placeholder="Enviar un mensaje"
            ></input>
            <div className="send-icon" onClick={ev => this.sendMessage(ev)}><i className="material-icons">send</i></div>
          </div>
        </div>

      </div>
      {selectedRoom && this.displayPlayer()}
      <h1>{this.state.videoInfo.title}</h1>
      {videoPlayer}
    </>
    );
  }
}
