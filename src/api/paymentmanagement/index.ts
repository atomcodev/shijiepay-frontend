import axios from 'axios'

export const getPayoutConfigApi = () => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payoutConfig')
    .then((response) => {
      if (response && response.data) {
        return response
      } else {
        return null
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    })
}

export const updatePayoutConfigApi = (
  action: string,
  maintain_switch: boolean,
  maintain_bankcodes: string
) => {
  let data = {}
  data['action'] = action
  data['maintain_switch'] = maintain_switch ? '1' : '0'
  data['maintain_bankcodes'] = maintain_bankcodes

  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payoutConfig', data)
    .then((response) => {
      if (response && response.data) {
        return response
      } else {
        return null
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      return null
    })
}

export const getPayOrderApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payment', {
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

export const getPayCallbackApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payout/callbackLog', {
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

export const exportPayOrderApi = () => {
  const formData = new FormData()
  formData.append('data_uuid', '666')
  formData.append('action', 'export_order')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payment', formData, {
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

export const getPayConfigStatisticsApi = () => {
  const formData = new FormData()
  formData.append('action', 'get_total_info')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payment', formData, {
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
