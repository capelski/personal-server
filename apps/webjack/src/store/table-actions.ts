import { Store } from 'vuex';
import { GameModes } from '../utils/game-modes';
import { State } from './state';

export const exitTable = (context: Store<State>) => {
    context.commit('setGameMode', undefined);
};

export const joinBasicStrategyTable = (context: Store<State>) => {
    context.commit('setGameMode', GameModes.basicStrategy);
};

export const joinOfflineTable = (context: Store<State>) => {
    context.commit('setGameMode', GameModes.local);
};

export default {
    exitTable,
    joinBasicStrategyTable,
    joinOfflineTable
}