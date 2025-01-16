import axios from 'axios'

export const getUserListApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/userList', {
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

export const saveUserApi = (data: any) => {
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/userList', data)
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

/*-------------------Role List--------------------*/

export const getRoleListApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/roleList', {
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

export const addRoleApi = (data: any) => {
  data['action'] = 'add_role_data'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/roleList', data)
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

export const editRoleApi = (data: any) => {
  data['action'] = 'edit_role_data'
  data['data_uuid'] = data['uuid']
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/roleList', data)
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

export const deleteRoleApi = (uuid: any) => {
  let data: any = {}
  data['data_uuid'] = uuid[0]
  data['action'] = 'del'
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/roleList', data)
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

/*-------------------Operation Log--------------------*/
export const getOperationLogApi = (params: any) => {
  return axios
    .get(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/systemLog', {
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
