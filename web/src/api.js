import axios from 'axios';
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: `http://192.168.0.12:8080/` //Change on host should be env variable.
});
