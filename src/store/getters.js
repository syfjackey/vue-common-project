
const getters = {
    userInfo(state) {
        return state.userStore.userInfo;
    },
    userToken(state) {
        return state.userStore.userToken;
    },
    userRoutes(state) {
        return state.userStore.userRoutes;
    }
}
export default getters;
