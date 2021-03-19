import React, { Component } from "react";
// import { Link } from "react-router-dom";
import RoomService from '../../services/RoomService';
import UserService from '../../services/UserService';
import socket from '../../components/Socket/Socket';
import "./ChatBox.scss";


export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.roomService = new RoomService();
    this.userService = new UserService();
    this.state = {
      user: this.props.user,
      inputMessage: "",
    };
  }




  displayRooms = () => {
    const { rooms } = this.state;
    return rooms.map((room, i) => <p className="room-selection" key={i} onClick={ev => this.updateMessages(room._id)}>{room.name}</p>)
  }

  displayMessages = () => {
    const  messages  = this.state.selectedRoom.content;
    
  return messages.map((message, i) => 
  <div key={i} className="chat-bubble">
    <h1 className="message-author">{message.owner} :</h1>
    <p className="message-text">{message.message}</p>
  </div>
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

  updateMessages = (id) => {
    this.roomService.fetchOneRoom(id)
    .then(
      (room) => {
        this.setState({ ...this.state, selectedRoom: room})
      }
    )
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.roomService.sendMessage(this.state.selectedRoom._id, this.state.inputMessage, this.state.user.username)
    .then(
      (message) => {
        console.log(message)
        socket.emit(`mensaje`, this.state.user.username, this.state.inputMessage, this.state.selectedRoom._id,)
        this.setState({ ...this.state, inputMessage: ""})
      }
    )
  }

  componentDidMount() {  
    this.updateRooms()
    socket.on('mensajes', mensaje => {
      console.log("mensaje", mensaje);
      console.log("room", this.state.selectedRoom);
      if(mensaje.roomId === this.state.selectedRoom._id){
        console.log(mensaje);
        let allMensajes = this.state.selectedRoom.content;
        console.log(allMensajes);
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

  render() {
    const { rooms } = this.state;
    const { selectedRoom } = this.state;

    return (
      <div className="chat-box">
        <div className="chat-rooms">
          <h1 className="salas-title">Salas</h1>
          {rooms && this.displayRooms()}
          {!rooms && <p>Loading rooms...</p> }
        </div>
        <div className="chat-container">
    <h1 className="room-title">{this.state.selectedRoom?.name}</h1>
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
    );
  }
}
