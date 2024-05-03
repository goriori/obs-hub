class wsService {
    constructor() {
        this.wsHost = 'ws://127.0.0.1/config'
        this.wsServer = 'http://127.0.0.1/config'
        this.videoStream = null
        this.connected = false
    }

    async initConnect() {
        this.videoStream = await new WebSocket(this.wsHost)
        this.connected = true
    }

    async sendMessage(message) {
        console.log('message:', message)
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

    async getConfig() {
        return await fetch(this.wsServer)
    }
}

export default new wsService()