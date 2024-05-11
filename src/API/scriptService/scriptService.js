import {axiosInstance} from '@/utils/axios/axios'

export default class ScriptService {
    static async loadScript(loadData) {
        try {
            const response = await axiosInstance({
                url: '/script',
                method: 'POST',
                data: loadData
            })
            return response.data
        } catch (e) {
            throw e
        }
    }

    static async deleteScript(deleteData) {
        try {
            const response = await axiosInstance({
                url: '/script',
                method: 'POST',
                data: deleteData
            })
            return response.data
        } catch (e) {
            throw e
        }
    }
}
