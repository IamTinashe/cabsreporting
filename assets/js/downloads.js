import axios from 'axios'
const BASE = process.env.baseUrl;

class Downloads {
  static get(api){
    let endpoint = BASE + api;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(endpoint)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
}

export default Downloads;