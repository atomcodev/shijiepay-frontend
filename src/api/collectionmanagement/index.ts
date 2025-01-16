import axios from 'axios'

// export const exportPayOrderApi = () => {
//     const formData = new FormData()
//     formData.append('data_uuid', '666')
//     formData.append('action', 'export_order')
//     return axios
//       .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/payment', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data' // Explicitly set Content-Type
//         }
//       })
//       .then((response) => {
//         if (response && response.data) {
//           return response.data
//         } else {
//           console.error('Response data is empty')
//           return null
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error)
//         return null
//       })
//   }

export const exportOrderListApi = () => {
  const formData = new FormData()
  formData.append('data_uuid', '666')
  formData.append('action', 'export_order')
  return axios
    .post(import.meta.env.VITE_BACKEND_API_ADDRESS + '/SJP4-padmin/collectionOrder', formData, {
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
