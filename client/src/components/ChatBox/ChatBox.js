import React, { Component } from "react";
// import { Link } from "react-router-dom";
import RoomService from '../../services/RoomService';
import "./ChatBox.scss";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.roomService = new RoomService();
    this.state = {
      user: this.props.user,
      
    };
  }




  displayRooms = () => {
    const { rooms } = this.state;
    return rooms.map((room, i) => <p onClick={ev => this.updateMessages(room._id)}>{room.name}</p>)
  }

  displayMessages = () => {
    const  messages  = this.state.selectedRoom.content;
    
    return messages.map((message, i) => <p>{message.message}</p>)
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
    console.log(id);
    this.roomService.fetchOneRoom(id)
    .then(
      (room) => {
        this.setState({ ...this.state, selectedRoom: room})
      }
    )
  }

  componentDidMount() {  
    this.updateRooms()
  }


  render() {
    const { rooms } = this.state;
    const { selectedRoom } = this.state;

    return (
      <div className="chat-box">
        <div className="chat-rooms">
          {rooms && this.displayRooms()}
          {!rooms && <p>Loading rooms...</p> }
        </div>
        <div className="chat-container">
          {selectedRoom && this.displayMessages()}
          {!selectedRoom && <p>Pick a room...</p> }
        </div>

      </div>
    );
  }
}
