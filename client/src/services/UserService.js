import axios from "axios";

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  fetchUsers = () => {
    return this.instance
      .get("/users")
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  fetchOneUser = id => {
    return this.instance
      .get(`/users/${id}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  updateUser = (id, name, birthdate) => {
    return this.instance
      .put(`/users/edit/${id}`, { name, birthdate })
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  newUser = (name, birthdate) => {
    return this.instance
      .post(`/users/new`, { name, birthdate })
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

export default UserService;
