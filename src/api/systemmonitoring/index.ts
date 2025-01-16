import axios from 'axios'

export const getOrderMonitorApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/orderMonitor', {
      params
    })
    .then((response) => {
      if (response && response.data) {
        console.log('Data:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    })
}

export const getPayoutOrderCheckApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payoutOrderCheck', {
      params
    })
    .then((response) => {
      if (response && response.data) {
        console.log('Data:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    })
}
