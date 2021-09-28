import axios from 'axios'
const BASE = process.env.baseUrl;

class Auth {
  static authenticate(data){
    let endpoint = BASE + '/reporting/authenticate';
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(endpoint, data)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
}

export default Auth;