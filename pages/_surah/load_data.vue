<template>
  <div class="p-10">
    <h1>Loading content</h1>
    <ul>
      <li v-for="(theme, index) in theme_list.theme" :key="index+1">
        {{ theme.from }} - {{ theme.to }}: {{ theme.text }}
      </li>
    </ul>
  </div>
</template>
<script>
import themeList from '~/components/theme.js'

export default {
  data () {
    return {
      theme_list: themeList(this.$route.params.surah)
    }
  },
  created () {
    this.surah_number = this.$route.params.surah
    this.$axios.$get(`${localStorage.base_url}/surah/${this.surah_number}/editions/${localStorage.edition},simple-quran`)
      .then((response) => {
        const translation = response.data[0]
        const arabic = response.data[1]
        for (const [i, ayah] of arabic.ayahs.entries()) {
          translation.ayahs[i].arabic = ayah.text
        }
        localStorage[`surah_${this.$route.params.surah}`] = JSON.stringify(translation)
        this.$router.push(`/${this.surah_number}`)
      })
  }
}
</script>
