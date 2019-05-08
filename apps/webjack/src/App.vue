<template>
    <div id="app" class="full-height">
        <Loader v-if="loading" />
        <div class="full-height" v-if="!loading">
            <div class="main-menu centered" v-if="!gameMode && !registeringPlayerOnline">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <p class="title">Webjack</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <p class="subtitle">Cashless multiplayer blackjack</p>
                        </div>
                    </div>

                    <div class="row top-space-20">
                        <div class="col-xs-12 text-center">
                            <button type="button" class="btn btn-primary" v-on:click="joinOfflineTable">
                                Play offline
                            </button>
                            <button type="button" class="btn btn-success" v-on:click="joinOnlineTable">
                                Play online
                            </button>
                            <button type="button" class="btn btn-warning" v-on:click="joinBasicStrategyTable">
                                Practice basic strategy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterOnline
                v-if="!gameMode && registeringPlayerOnline"
                :registerPlayerHandler="registerPlayer"
                :cancelRegisterHandler="cancelRegister"
            />
            <LocalTable
                v-if="gameMode === GameModes.local"
                v-on:TableExited="exitTable"
            />
            <RemoteTable
                v-if="gameMode === GameModes.remote"
                v-on:TableExited="exitTable"
                :serverUrl="serverUrl"
                :tableId="onlineTableId"
                :userId="onlineUserId"
            />
            <BasicStrategyTable
                v-if="gameMode === GameModes.basicStrategy"
                v-on:TableExited="exitTable"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { RegisterOnline, RemoteTable, BasicStrategyTable, LocalTable, Loader } from 'webjack-ui-components'
    import { GameModes } from './utils/game-modes';

    declare const toastr: any;
    declare const process: any;

    export default Vue.extend({
        name: 'App',
        components: {
            RegisterOnline,
            RemoteTable,
            BasicStrategyTable,
            LocalTable,
            Loader
        },
        data() {
            return {
                GameModes
            };
        },
        computed: {
            loading(): boolean {
                return this.$store.state.loading.value;
            },
            onlineUserId(): string {
                return this.$store.state.onlineUserId;
            },
            onlineTableId(): string {
                return this.$store.state.onlineTableId;
            },
            registeringPlayerOnline(): boolean {
                return this.$store.state.registeringPlayerOnline.value;
            },
            gameMode(): GameModes {
                return this.$store.state.gameMode;
            },
            serverUrl() {
                return process.env.baseApiUrl;
            }
        },
        created() {
            this.$store.dispatch('retrievePlayerStatus');
        },
        methods: {
            joinOnlineTable() {
                this.$store.dispatch('showOnlineRegisterOrJoinTable');
            },
            joinOfflineTable() {
                this.$store.dispatch('joinOfflineTable');
            },
            joinBasicStrategyTable() {
                this.$store.dispatch('joinBasicStrategyTable');
            },
            registerPlayer(playerName: string) {
                this.$store.dispatch('registerPlayer', playerName);
            },
            cancelRegister() {
                this.$store.dispatch('cancelPlayerRegister');
            },
            exitTable() {
                this.$store.dispatch('exitTable');
            }
        }
    });
</script>

<style>
    @font-face {
        font-family: 'Montserrat';
        src: url('/static/fonts/Montserrat-Regular.ttf?$modena=webjack');
    }

    html, body {
        height: 100%;
        background-color: #088446;
        color: #EEDC82;
        font-family: 'Montserrat', sans-serif;
    }

    .full-height {
        height: 100%;
    }

    .centered {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .top-space-20 {
        margin-top: 20px;
    }

    .main-menu .title {
        font-size: 75px;
    }

    .main-menu .subtitle {
        font-size: 20px;
    }

    .main-menu .btn {
        margin-top: 10px;
    }
</style>
