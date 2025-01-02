import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        isLogin: true,
    }),
    actions: {
        updateIsLogin(newValue) {
            this.isLogin = newValue;
        },
    },
});