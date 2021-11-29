const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  constantRoutes: (state) => state.routerPermission.constantRoutes,
};
export default getters;
