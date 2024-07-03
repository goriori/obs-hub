import {axiosInstance} from "@/utils/axios/axios.js";


export class PlayerService {
    static async loadMp3FileForPlayer(mp3File) {
        try {
            const response = await axiosInstance({
                url: '/upload_mp3',
                method: 'post',
                data: mp3File
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}