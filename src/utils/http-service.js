import axios from 'axios'

/** Create an Axios instance. */
function createService() {
  return axios.create()
}

function createRequestFunction(service) {
  return async function (configArray) {
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

    // Make all the requests in parallel
    const responses = await axios.all(
      configArray.map((config) => service({ ...configDefault, ...config }))
    )

    // Return an array of response data
    return responses.length === 1 ? responses[0].data : responses.map((response) => response.data)
  }
}

/** Instance for network request */
export const service = createService()

/** Method for network request */
export const request = createRequestFunction(service)
