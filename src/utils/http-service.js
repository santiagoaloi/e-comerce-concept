import axios from 'axios'

/** Create an Axios instance. */
function createService() {
  return axios.create()
}

function createRequestFunction(service) {
  return function (config) {
    const configDefault = {
      headers: {
        /**  Authorization: 'Bearer ' + getToken(), */
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true,
      baseURL: import.meta.env.VITE_BaseApiURL,
      data: {}
    }
    return service({ ...configDefault, ...config })
  }
}

/** Instance for network request */
export const service = createService()

/** Method for network request */
export const request = createRequestFunction(service)
