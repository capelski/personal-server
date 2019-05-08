import { get } from '../utils/http';
import { stallPromise } from '../utils/shared';
import { Store } from 'vuex';
import { State } from './state';
import { GameModes } from '../utils/game-modes';

declare const process: any;

const { baseApiUrl } = process.env;

export const cancelPlayerRegister = (context: Store<State>) => {
    context.commit('setRegisteringPlayerOnline', false);
};

export const retrievePlayerStatus = (context: Store<State>) => {
    context.commit('setLoading', true);
    return stallPromise(get(
        baseApiUrl + '/is-player-registered',
        null,
        {},
        'Error checking whether the player is already registered'))
        .then(data => {
            if (data.playerId) {
                context.commit('setOnlineUserId', data.playerId);

                if (data.tableId) {
                    context.commit('setOnlineTableId', data.tableId);
                    context.commit('setGameMode', GameModes.remote)
                }
            }
            context.commit('setLoading', false);
        });
};

export const showOnlineRegisterOrJoinTable = (context: Store<State>) => {
    if (!context.state.onlineUserId) {
        context.commit('setRegisteringPlayerOnline', true);
    }
    else {
        context.commit('setGameMode', GameModes.remote);
    }
};

// TODO => Move this logic to RegisterPlayerOnline component
export const registerPlayer = (context: Store<State>, playerName: string) => {
    context.commit('setLoading', true);
    return stallPromise(get(
        baseApiUrl + '/register-player',
        { name: playerName },
        {},
        'Error registering the player'))
    .then(data => {
        context.commit('setOnlineUserId', data.playerId);
        context.commit('setRegisteringPlayerOnline', false);
        context.commit('setGameMode', GameModes.remote);
        context.commit('setLoading', false);
    });
};

export default {
    cancelPlayerRegister,
    retrievePlayerStatus,
    showOnlineRegisterOrJoinTable,
    registerPlayer
};