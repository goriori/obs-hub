import {defineStore} from "pinia";
import {ref} from "vue";
import {VirtualObjectsGateway} from "@/enitites/gateway/virtual-objects-gateway/index.js";
import {PlayersGateway} from "@/enitites/gateway/players-gateway/index.js";


const usePlayerStore = defineStore('players', () => {
    const players = ref([])
    const addPlayer = (player) => players.value.push(player)
    const getPlayer = (name) => players.value.find(player => player.name === name)
    const getPlayers = () => players.value
    return {
        players,
        addPlayer,
        getPlayer,
        getPlayers,
    }
})

export const usePlayerGateway = () => {
    return new PlayersGateway(usePlayerStore())
}

