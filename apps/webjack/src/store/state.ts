import { GameModes } from '../utils/game-modes';

export interface ValueReference<T> {
    value: T;
}

export interface State {
    gameMode: GameModes | undefined;
    loading: ValueReference<boolean>;
    onlineTableId: string | undefined;
    onlineUserId: string | undefined;
    registeringPlayerOnline: ValueReference<boolean>;
}

export default {
    gameMode: undefined,
    loading: {
        value: false
    },
    onlineTableId: undefined,
    onlineUserId: undefined,
    registeringPlayerOnline: {
        value: false
    }
} as State;