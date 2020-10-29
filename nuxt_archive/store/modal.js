export const state = () => ({
  display: false,
  header: '',
  body: '',
  type: 'tafsir'
})

export const mutations = {
  set_tafsir (state, data) {
    state.display = true
    state.header = data.header
    state.body = data.body
    state.type = 'tafsir'
  },
  set_topic_list (state, data) {
    state.display = true
    state.header = data.header
    state.body = data.body
    state.type = 'topic'
  },
  close (state) {
    state.display = false
    state.header = ''
    state.body = ''
  }
}
