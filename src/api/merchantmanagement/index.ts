import axios from 'axios'

export const getInternalListStatisticsApi = () => {
  const formData = new FormData()
  formData.append('action', 'get_total_info')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/rechargeMoney', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Explicitly set Content-Type
      }
    })
    .then((response) => {
      if (response && response.data) {
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

export const getDedulctionListStatisticsApi = () => {
  const formData = new FormData()
  formData.append('action', 'get_total_info')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/reduceMoney', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Explicitly set Content-Type
      }
    })
    .then((response) => {
      if (response && response.data) {
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

export const getWithdrawalStatistics = () => {
  const formData = new FormData()
  formData.append('action', 'get_total_info')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/withdrawList', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Explicitly set Content-Type
      }
    })
    .then((response) => {
      if (response && response.data) {
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
