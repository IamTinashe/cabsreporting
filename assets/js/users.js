import axios from 'axios'
const BASEUrl = process.env.baseUrl;

class Users {
  static createUser(user) {
    let api = '/api/v1/users/create';
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.post(BASEUrl + api, user)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static getUserByID(id) {
    let api = '/api/v1/users/' + id;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static updateUserByID(id, user) {
    let api = '/api/v1/users/' + id;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.put(BASEUrl + api, user)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static getAllUsers() {
    let api = '/api/v1/users/all';
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static deleteUserByID(id) {
    let api = '/api/v1/users/delete/' + id;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.delete(BASEUrl + api)
        resolve(response.data);
      } catch (error) {
        reject(error.response)
      }
    })
  }

  static getUserByOmID(omID) {
    let api = '/api/v1/users/omId/' + omID;
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

export default Users;