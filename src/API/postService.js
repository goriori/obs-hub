import { axiosInstance } from '@/utils/axios/axios'

export default class PostService {
  static async getData() {
    try {
      const response = await axiosInstance({
        url: '/todos/2',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'GET',
      })
      return response.data
    } catch (e) {
      throw e
    }
  }
}
