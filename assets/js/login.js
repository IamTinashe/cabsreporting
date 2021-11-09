import axios from 'axios';
const BASEUrl = 'http://172.16.5.129:1993';

class Login {
  static attempt(model) {
    let api = '/user/authenticate';
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