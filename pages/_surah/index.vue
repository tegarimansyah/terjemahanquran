<template>
  <div v-if="surah != null" class="container">
    <nuxt-link to="/">
      <span class="block text-sm text-blue-600">Back to home</span>
    </nuxt-link>
    <h1 class="text-2xl font-bold">
      {{ surah_name.id.surah_name }} - {{ surah_name.id.surah_translation }}
    </h1>
    <input v-model="enable_translation" type="checkbox"> Show Translation
    <input v-model="enable_arabic" type="checkbox"> Show Arabic
    <hr class="my-3">
    <div :id="ayah.numberInSurah" v-for="ayah in surah.ayahs" :key="ayah.numberInSurah" class="mt-1 mb-3 p-1 pt-3 hover:bg-gray-300">
      <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-2 text-right text-3xl">{{ ayah.arabic }}</span>
      <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.text }}</span>
    </div>
  </div>
</template>

<style>
.container {
    @apply p-10
}
.hide {
    display: none;
}
@font-face {
  font-family: 'MeQuran';
  src: url('//cdn.alquran.cloud/public/fonts/me_quran-webfont.otf');
}
.font-mequran {
    font-family: 'MeQuran';
}
</style>

<script>
import surahList from '~/components/surah.js'

export default {
  data () {
    return {
      surah: null,
      enable_translation: true,
      enable_arabic: true
    }
  },
  watch: {
    enable_translation (state) {
      localStorage.enable_translation = state
    },
    enable_arabic (state) {
      localStorage.enable_arabic = state
    }
  },
  created () {
    this.surah_number = this.$route.params.surah
    this.surah = localStorage[`surah_${this.surah_number}`]

    if (!this.surah) {
      this.$router.push(`/${this.surah_number}/load_data`)
    } else {
      this.surah = JSON.parse(this.surah)
      this.surah_name = surahList(this.surah_number)
      this.enable_translation = localStorage.enable_translation === 'true'
      this.enable_arabic = localStorage.enable_arabic === 'true'
    }
  }
}
</script>
