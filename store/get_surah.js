export const state = () => ({
  data: {}
})

export const action = {
  async setSurah ({ commit, params, $axios }) {
    const { data } = await $axios.get(`${localStorage.base_url}/surah/${params.surah}/editions/${localStorage.edition},simple-quran`)
    commit('setSurah', data.data)
  }
}
