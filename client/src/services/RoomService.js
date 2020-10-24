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

  sendMessage = (id, message, owner, created_at) => {
    return this.instance
      .post(`/sendMessage/${id}`, {owner, message, created_at})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteUser = id => {
    return this.instance
      .delete(`/users/delete/${id}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default RoomService;
