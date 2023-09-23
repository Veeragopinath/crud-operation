

export const state = () => ({
 currentUser:{},
 listOfUsers: [],
 
});

export const getters = {
  userRole(state) {
    return state.currentUser.role;
  },

  username(state, getters) {
    return getters.user.username;
  },
 
};

export const actions = {
  getUsersList({ commit }) {
    return this.$axios.get("/users").then((res) => {
      commit('setUsersList', res.data);
      return res.data;
    });
  },
  getUserById({ commit }, userId) {
    return this.$axios.get(`/users/${userId}`)
    .then((res) => {
      
      return res.data;

    })

  },
  createUser({ dispatch },user) {
    return this.$axios
    .post("/users", user)
    .then((res) => {
        
        dispatch('getUsersList');
        
      });
  },
  updateUser({ dispatch }, user) {
    return this.$axios
      .put(`/users/${user.id}`, user)
      .then((res) => {
        dispatch('getUsers');
      });
  },
  removeUser({ dispatch }, userId) {
    return this.$axios.delete(`/users/${userId}`)
    .then((res) => {
      dispatch('getUsersList');
    });
  }
  
};

export const mutations = {
    setUsersList(state, res) {
    state.listOfUsers = res;
  },
  setUserDetails(state, currentUser) {
    state.currentUser = currentUser;
  },
  clearUserDetails(state) {
    state.currentUser = {}
  }

};
