export const state = () => ({
  surah: {},
  topics: []
})

export const mutations = {
  set (state, data) {
    state.surah = data.surah
    state.topics = data.topics
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  }
}
