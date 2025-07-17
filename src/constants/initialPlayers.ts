import type { Player } from "../types/GameTypes";

const initialFirstPlayer: Player = {
    preName: "Player1",
    name: "Player1",
    symbol: "○"
}

const initialSecondPlayer: Player = {
    preName: "Player2",
    name: "Player2",
    symbol: "×"
}

export { initialFirstPlayer, initialSecondPlayer };