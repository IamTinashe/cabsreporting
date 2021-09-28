import axios from 'axios'
const BASEUrl = process.env.baseUrl;

class Accounts {
  static getRecords(page, size) {
    let api = '/api/accounts/all?page=' + page + '&size=' + size;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
  static getRecordByID(id, page, size) {
    let api = '/api/accounts/' + id;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static getRecordByCoCode(coCode, page, size) {
    let api = '/api/accounts/coCode?coCode=' + coCode + '&page=' + page + '&size=' + size;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }
}

export default Accounts;