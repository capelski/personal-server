import { State } from './state';
import { GameModes } from '../utils/game-modes';

export default {
    setGameMode(state: State, value: GameModes | undefined) {
        state.gameMode = value;
    },
    setLoading(state: State, value: boolean) {
        state.loading = { value };
    },
    setOnlineTableId(state: State, onlineTableId: string| undefined) {
        state.onlineTableId = onlineTableId;
    },
    setOnlineUserId(state: State, onlineUserId: string | undefined) {
        state.onlineUserId = onlineUserId;
    },
    setRegisteringPlayerOnline(state: State, value: boolean) {
        state.registeringPlayerOnline = { value };
    }
};