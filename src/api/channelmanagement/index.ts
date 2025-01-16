import axios from 'axios'

export const getTunnelApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/tunnel', {
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

export const updateTunnelApi = (data: any) => {
  data['action'] = 'update_statu'
  data['data_uuid'] = data.uuid
  data.tunnel_statu = !data.tunnel_statu
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/tunnel', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

/* -------------------- Payment Channel ----------------------*/
export const getPaymentChannelApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/payout', {
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

export const addPaymentChannelApi = (data: any) => {
  data['action'] = 'add_channel_data'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/payout', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

export const editPaymentChannelApi = (data: any) => {
  data['action'] = 'edit_channel_data'
  data['data_uuid'] = data['uuid']
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/payout', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

export const deletePaymentChannelApi = (uuid: any) => {
  let data: any = {}
  data['data_uuid'] = uuid[0]
  data['action'] = 'del'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/payout', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

/* --------------- Collection channel ----------------- */
export const getCollectionChannelApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/trade', {
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

export const addCollectionChannelApi = (data: any) => {
  data['action'] = 'add_channel_data'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/trade', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

export const editCollectionChannelApi = (data: any) => {
  data['action'] = 'edit_channel_data'
  data['data_uuid'] = data['uuid']
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/trade', data)
    .then((response) => {
      if (response && response.data) {
        console.log('Edit User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

export const deleteCollectionChannelApi = (uuid: any) => {
  let data: any = {}
  data['data_uuid'] = uuid[0]
  data['action'] = 'del'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/trade', data)
    .then((response) => {
      if (response && response.data) {
        console.log('User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}

export const getModuleCodeApi = () => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/paymodule')
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

export const getPayMethodApi = (uuid: string, key: string) => {
  let data: any = {}
  data['action'] = 'get_module_codes'
  data['module_code'] = key
  data['uuid'] = uuid
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/channel/trade', data)
    .then((response) => {
      if (response && response.data) {
        console.log('GetPayMethodAPI User saved:', response.data)
        return response.data
      } else {
        console.error('Response data is empty')
        return null
      }
    })
    .catch((error) => {
      console.error('Error saving user:', error)
      return null
    })
}
