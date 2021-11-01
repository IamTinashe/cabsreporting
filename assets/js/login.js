import axios from 'axios';
const BASEUrl = 'https://172.16.0.39:1990';

class Login {
  static attempt(model) {
    let api = '/ad/authenticate';
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(BASEUrl + api, model)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
}

export default Login;