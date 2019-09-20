export const state = () => ({
  islogin: 1
})

export const mutations = {
  login (state,islogin) {
    state.islogin=islogin
  }
}