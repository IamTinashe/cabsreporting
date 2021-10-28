import axios from 'axios';
import https from 'https';
const BASEUrl = 'https://172.16.0.39:1990';
const httpsAgent = new https.Agent({ rejectUnauthorized: false});
const instance = axios.create({ httpsAgent });

class Login {
  static attempt(model) {
    let api = '/ad/authenticate';
    return new Promise(async (resolve, reject) => {
      try {
        let response = await instance.post(BASEUrl + api, model)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
}

export default Login;