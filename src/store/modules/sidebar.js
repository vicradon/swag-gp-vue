const state = () => ({
  isOpen: false,
  activeLink: "levels",
});

const mutations = {
  setActiveLink(state, link) {
    state.activeLink = link;
  },
  toggleSidebar(state) {
    state.isOpen = !state.isOpen;
  },
};

export default {
  state,
  mutations,
};
