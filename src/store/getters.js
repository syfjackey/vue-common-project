
const getters = {
    userInfo(state) {
        return state.userStore.userInfo;
    },
    userToken(state) {
        return state.userStore.userToken;
    },
    userRoutes(state) {
        return state.userStore.userRoutes;
    },
    loginStatus(state){
        return state.userStore.userToken!==''
    }
}
export default getters;
