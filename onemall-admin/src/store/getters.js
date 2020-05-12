const getters = {
    token: state => state.user.token,
    sidebar: state => state.app.sidebar,
    permission_routers: state => state.permission.routers,
    device: state => state.app.device,
}
export default getters