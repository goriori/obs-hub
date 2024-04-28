class wsService {
    constructor() {
        this.host = 'ws://127.0.0.1/config'
        this.videoStream = null
        this.connected = false
    }

    async initConnect() {
        this.videoStream = await new WebSocket(this.host)
        this.connected = true
    }

    async sendMessage(message) {
        if (!this.connected) {
            const checkConnectInterval = setInterval(async () => {
                if (this.connected) {
                    await this.videoStream.send(JSON.stringify(message))
                    clearInterval(checkConnectInterval)
                    return true
                }
            }, 3000)
        } else {
            await this.videoStream.send(JSON.stringify(message))
        }
    }

    checkConnect() {
        return this.connected
    }
}

export default new wsService()