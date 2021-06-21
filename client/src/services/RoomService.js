import axios from "axios";

class RoomService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  fetchRooms = () => {
    return this.instance
      .get("/rooms")
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  fetchOneRoom = id => {
    return this.instance
      .get(`/rooms/${id}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  sendMessage = (id, message, owner) => {
    return this.instance
      .post(`/rooms/sendMessage/${id}`, {owner, message})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteSong = (roomId, songs )=> {
    return this.instance
      .put(`/rooms/delete/${roomId}`, {songs})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  addSong = (song, songs, roomId )=> {
    return this.instance
      .put(`/rooms/add/${roomId}`, {song, songs})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default RoomService;
