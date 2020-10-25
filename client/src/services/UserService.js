import axios from "axios";

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  checkUserName = id => {
    return this.instance
      .get(`/users/${id}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default UserService;
