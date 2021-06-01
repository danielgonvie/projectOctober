import axios from "axios";

class SongService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  fetchSongs = () => {
    return this.instance
      .get("/songs")
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  addSong = (id, videoId, requestedBy) => {
    return this.instance
      .post(`/addSong`, {videoId, requestedBy})
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteSong = (id) => {
    return this.instance
      .delete(`/songs/deleteSong/${id}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default SongService;
