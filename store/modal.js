export const state = () => ({
  display: false,
  header: '',
  body: ''
})

export const mutations = {
  set (state, data) {
    state.display = true
    state.header = data.header
    state.body = data.body
  },
  close (state) {
    state.display = false
    state.header = ''
    state.body = ''
  }
}
