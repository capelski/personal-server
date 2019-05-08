import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import playerRegisterActions from './player-register-actions';
import tableActions from './table-actions';
import state, { State } from './state';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store<State>({
        state,
        actions: {
            ...playerRegisterActions as any,
            ...tableActions as any
        },
        mutations
    });
}