import {Gateway} from "@/enitites/gateway/index.js";

export class PlayersGateway extends Gateway {
    constructor(store) {
        super();
        this.store = store
    }

    addPlayer(player) {
        this.store.addPlayer(player)
    }

    getPlayer(name) {
        return this.store.getPlayer(name)
    }

    getPlayersForConfigFormat() {
        const players = this.getPlayers()
        const playersConfig = {}
        players.forEach(player => {
            playersConfig[player.name] = {...player}
            delete playersConfig[player.name]['name']
        })
        return playersConfig
    }

    getPlayers() {
        return this.store.getPlayers()
    }
}