const getters = {
    sidebar:state => state.layout.sidebar,
    pageTags:state => state.layout.tags,
    navpath:state => state.layout.navBar.navPath,
}
export default getters